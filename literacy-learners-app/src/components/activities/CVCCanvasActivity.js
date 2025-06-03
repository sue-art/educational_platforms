// literacy-learners-app/src/components/activities/CVCCanvasActivity.js
import React, { useRef, useEffect, useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const THEME_BACKGROUND_COLOR = '#ffffef';
const cvcWordList = [
    { word: 'cat', imageSrc: '/assets/images/cvc/cat.png' },
    { word: 'dog', imageSrc: '/assets/images/cvc/dog.png' },
    { word: 'sun', imageSrc: '/assets/images/cvc/sun.png' },
    { word: 'pig', imageSrc: '/assets/images/cvc/pig.png' },
    { word: 'hen', imageSrc: '/assets/images/cvc/hen.png' },
];

const TILE_WIDTH = 50; const TILE_HEIGHT = 50;
const TILE_COLOR_DEFAULT = '#fdd05a'; const TILE_TEXT_COLOR = '#1a1a18'; const DISTRACTOR_TILE_COLOR = '#e0e0e0';
const DROP_ZONE_WIDTH = 60; const DROP_ZONE_HEIGHT = 60;
const DROP_ZONE_COLOR_DEFAULT = '#cdf4d3'; const DROP_ZONE_HOVER_COLOR = '#b8e6bf';
const FEEDBACK_CORRECT_COLOR = 'lightgreen'; const FEEDBACK_INCORRECT_COLOR = 'lightcoral';
const PROGRESSION_DELAY = 1500;

const generateTilesForWord = (wordObj, allLetters = "abcdefghijklmnopqrstuvwxyz") => {
  if (!wordObj || !wordObj.word) return [];
  const word = wordObj.word;
  const wordLetters = word.split('');
  const requiredTiles = wordLetters.map((letter, index) => ({ id: `tile-${letter}-${index}`, letter: letter, x: 50 + index * (TILE_WIDTH + 10), y: CANVAS_HEIGHT - TILE_HEIGHT - 30, originalX: 50 + index * (TILE_WIDTH + 10), originalY: CANVAS_HEIGHT - TILE_HEIGHT - 30, width: TILE_WIDTH, height: TILE_HEIGHT, color: TILE_COLOR_DEFAULT, isDragging: false, isSnapped: false, snappedZoneId: null, isDistractor: false }));
  const distractorCount = 3; let availableDistractors = allLetters.split('').filter(l => !wordLetters.includes(l)); const distractorTiles = [];
  for (let i = 0; i < distractorCount; i++) { if (availableDistractors.length === 0) break; const randomIndex = Math.floor(Math.random() * availableDistractors.length); const distractorLetter = availableDistractors.splice(randomIndex, 1)[0]; distractorTiles.push({ id: `tile-distractor-${distractorLetter}-${i}`, letter: distractorLetter, x: 50 + (wordLetters.length + i) * (TILE_WIDTH + 10), y: CANVAS_HEIGHT - TILE_HEIGHT - 30, originalX: 50 + (wordLetters.length + i) * (TILE_WIDTH + 10), originalY: CANVAS_HEIGHT - TILE_HEIGHT - 30, width: TILE_WIDTH, height: TILE_HEIGHT, color: DISTRACTOR_TILE_COLOR, isDragging: false, isSnapped: false, snappedZoneId: null, isDistractor: true }); }
  const allTiles = [...requiredTiles, ...distractorTiles];
  for (let i = allTiles.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [allTiles[i], allTiles[j]] = [allTiles[j], allTiles[i]]; }
  allTiles.forEach((tile, index) => { tile.x = 50 + index * (TILE_WIDTH + 10); tile.originalX = tile.x; });
  return allTiles;
};

const totalDropZoneWidth = 3 * DROP_ZONE_WIDTH + 2 * 20; const dropZoneStartX = (CANVAS_WIDTH - totalDropZoneWidth) / 2;
const initialDropZones = [
  { id: 'dz1', x: dropZoneStartX, y: 150, width: DROP_ZONE_WIDTH, height: DROP_ZONE_HEIGHT, letter: null, color: DROP_ZONE_COLOR_DEFAULT, isHovered: false, expectedLetter: '' },
  { id: 'dz2', x: dropZoneStartX + DROP_ZONE_WIDTH + 20, y: 150, width: DROP_ZONE_WIDTH, height: DROP_ZONE_HEIGHT, letter: null, color: DROP_ZONE_COLOR_DEFAULT, isHovered: false, expectedLetter: '' },
  { id: 'dz3', x: dropZoneStartX + 2 * (DROP_ZONE_WIDTH + 20), y: 150, width: DROP_ZONE_WIDTH, height: DROP_ZONE_HEIGHT, letter: null, color: DROP_ZONE_COLOR_DEFAULT, isHovered: false, expectedLetter: '' },
];

const drawTile = (ctx, tile, validationState) => {
  let currentTileColor = tile.color;
  if (tile.isSnapped) { if (validationState === 'correct') { currentTileColor = FEEDBACK_CORRECT_COLOR; } else if (validationState === 'incorrect') { currentTileColor = FEEDBACK_INCORRECT_COLOR; } }
  ctx.fillStyle = currentTileColor;
  let currentGlobalAlpha = ctx.globalAlpha; if (tile.isDragging) { ctx.globalAlpha = 0.7; }
  ctx.fillRect(tile.x, tile.y, tile.width, tile.height);
  if (tile.isDragging) { ctx.globalAlpha = currentGlobalAlpha; }
  ctx.strokeStyle = TILE_TEXT_COLOR; ctx.strokeRect(tile.x, tile.y, tile.width, tile.height);
  ctx.fillStyle = TILE_TEXT_COLOR; ctx.font = `${TILE_HEIGHT * 0.5}px Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(tile.letter.toUpperCase(), tile.x + tile.width / 2, tile.y + tile.height / 2);
};
const drawDropZone = (ctx, zone, validationState) => {
  let zoneColor = zone.color;
  if (zone.isHovered) { zoneColor = DROP_ZONE_HOVER_COLOR; }
  else if (zone.letter && validationState !== 'pending') { if (validationState === 'correct') { zoneColor = FEEDBACK_CORRECT_COLOR; } else if (validationState === 'incorrect') { zoneColor = FEEDBACK_INCORRECT_COLOR; } }
  else { zoneColor = DROP_ZONE_COLOR_DEFAULT; }
  ctx.fillStyle = zoneColor; ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
  ctx.strokeStyle = '#666'; ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);
};
const drawTargetRepresentation = (ctx, wordObj, image) => {
  if (!wordObj) return;
  const targetX = CANVAS_WIDTH / 2;
  const targetY = 70;
  const imageSize = 100;
  if (image && image.complete && image.naturalHeight !== 0) {
    const aspectRatio = image.naturalWidth / image.naturalHeight;
    let drawWidth = imageSize; let drawHeight = imageSize;
    if (aspectRatio > 1) { drawHeight = imageSize / aspectRatio; } else { drawWidth = imageSize * aspectRatio; }
    ctx.drawImage(image, targetX - drawWidth / 2, targetY - drawHeight / 2, drawWidth, drawHeight);
  } else {
    ctx.fillStyle = TILE_TEXT_COLOR; ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(wordObj.word.toUpperCase(), targetX, targetY);
  }
};
const drawFeedbackText = (ctx, validationState) => {
    if (validationState === 'pending') return; let message = '';
    if (validationState === 'correct') { message = 'Correct!'; ctx.fillStyle = 'green'; }
    else if (validationState === 'incorrect') { message = 'Try Again!'; ctx.fillStyle = 'red'; }
    ctx.font = 'bold 36px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(message, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 100);
};

const CVCCanvasActivity = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWordObj = cvcWordList[currentWordIndex];

  const [letterTiles, setLetterTiles] = useState([]);
  const [dropZones, setDropZones] = useState([]);
  const [validationState, setValidationState] = useState('pending');
  const [targetImageObject, setTargetImageObject] = useState(null);

  const isDraggingRef = useRef(false);
  const draggedTileInfoRef = useRef(null);
  const progressionTimeoutRef = useRef(null);

  useEffect(() => {
    if (currentWordObj && currentWordObj.imageSrc) {
      setTargetImageObject(null);
      const img = new Image();
      img.onload = () => { setTargetImageObject(img); };
      img.onerror = () => { console.error("Failed to load image:", currentWordObj.imageSrc); setTargetImageObject(null); };
      img.src = process.env.PUBLIC_URL + currentWordObj.imageSrc;
    } else { setTargetImageObject(null); }
  }, [currentWordObj]);

  const getMousePos = (canvas, evt) => { const rect = canvas.getBoundingClientRect(); return { x: evt.clientX - rect.left, y: evt.clientY - rect.top }; };
  const getTouchPos = (canvas, touch) => { const rect = canvas.getBoundingClientRect(); return { x: touch.clientX - rect.left, y: touch.clientY - rect.top }; };

  const renderCanvas = useCallback(() => {
    const ctx = contextRef.current; if (!ctx) return;
    ctx.fillStyle = THEME_BACKGROUND_COLOR; ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawTargetRepresentation(ctx, currentWordObj, targetImageObject);
    dropZones.forEach(zone => drawDropZone(ctx, zone, validationState));
    letterTiles.filter(t => t.id !== (draggedTileInfoRef.current?.originalTileId)).forEach(tile => { drawTile(ctx, tile, validationState); });
    if (isDraggingRef.current && draggedTileInfoRef.current && draggedTileInfoRef.current.tile) { drawTile(ctx, draggedTileInfoRef.current.tile, validationState); }
    drawFeedbackText(ctx, validationState);
  }, [currentWordObj, letterTiles, dropZones, validationState, targetImageObject]);

  useEffect(() => {
    if (progressionTimeoutRef.current) { clearTimeout(progressionTimeoutRef.current); progressionTimeoutRef.current = null; }
    const allZonesFilled = dropZones.every(zone => zone.letter !== null);
    if (allZonesFilled && dropZones.length > 0 ) {
      const assembledWord = dropZones.map(zone => zone.letter).join('');
      if (currentWordObj && assembledWord.toLowerCase() === currentWordObj.word.toLowerCase()) {
        if (validationState !== 'correct') {
            setValidationState('correct');
            progressionTimeoutRef.current = setTimeout(() => { setCurrentWordIndex(prevIndex => (prevIndex + 1) % cvcWordList.length); }, PROGRESSION_DELAY);
        }
      } else { if (validationState !== 'incorrect') { setValidationState('incorrect'); } }
    } else if (!allZonesFilled && validationState !== 'pending') {
        setValidationState('pending');
    }
    return () => { if (progressionTimeoutRef.current) { clearTimeout(progressionTimeoutRef.current); } };
  }, [dropZones, currentWordObj, validationState, currentWordIndex]);

  const handleReset = useCallback(() => {
    if (progressionTimeoutRef.current) { clearTimeout(progressionTimeoutRef.current); progressionTimeoutRef.current = null; }
    if (!currentWordObj) return;
    setLetterTiles(generateTilesForWord(currentWordObj).map(tile => ({ ...tile, x: tile.originalX, y: tile.originalY, isDragging: false, isSnapped: false, snappedZoneId: null, color: tile.isDistractor ? DISTRACTOR_TILE_COLOR : TILE_COLOR_DEFAULT })));
    setDropZones(initialDropZones.map((dz, index) => ({ ...dz, letter: null, isHovered: false, color: DROP_ZONE_COLOR_DEFAULT, expectedLetter: currentWordObj.word[index] || '' })));
    setValidationState('pending');
  }, [currentWordObj]);

  const handleMouseDown = (event) => {
    if (validationState !== 'pending') { handleReset(); return; }
    const pos = getMousePos(canvasRef.current, event);
    for (let i = letterTiles.length - 1; i >= 0; i--) {
      const tileFromState = letterTiles[i];
      let currentTileX = tileFromState.x; let currentTileY = tileFromState.y;
      if (tileFromState.isSnapped) {
          const zone = dropZones.find(z => z.id === tileFromState.snappedZoneId);
          if (zone) { currentTileX = zone.x + (zone.width - tileFromState.width) / 2; currentTileY = zone.y + (zone.height - tileFromState.height) / 2; }
      }
      if (pos.x >= currentTileX && pos.x <= currentTileX + tileFromState.width && pos.y >= currentTileY && pos.y <= currentTileY + tileFromState.height) {
        isDraggingRef.current = true;
        if (tileFromState.isSnapped) {
            setDropZones(prevZones => prevZones.map(z => z.id === tileFromState.snappedZoneId ? { ...z, letter: null, color: DROP_ZONE_COLOR_DEFAULT } : z ));
        }
        const tileToDrag = { ...tileFromState, color: tileFromState.isDistractor ? DISTRACTOR_TILE_COLOR : TILE_COLOR_DEFAULT, isDragging: true, isSnapped: false, snappedZoneId: null, x: currentTileX, y: currentTileY };
        draggedTileInfoRef.current = { tile: tileToDrag, originalTileId: tileFromState.id, offsetX: pos.x - currentTileX, offsetY: pos.y - currentTileY };
        setLetterTiles(prevTiles => prevTiles.map(t => t.id === tileFromState.id ? { ...t, isDragging: true, isSnapped: false, snappedZoneId: null, color: t.isDistractor ? DISTRACTOR_TILE_COLOR : TILE_COLOR_DEFAULT } : t ));
        return;
      }
    }
  };
  const handleMouseMove = (event) => {
    if (validationState !== 'pending') return;
    if (!isDraggingRef.current || !draggedTileInfoRef.current) return;
    const pos = getMousePos(canvasRef.current, event);
    const { tile, offsetX, offsetY } = draggedTileInfoRef.current;
    tile.x = pos.x - offsetX; tile.y = pos.y - offsetY;
    setDropZones(prevZones => prevZones.map(zone => {
        const isHovering = !zone.letter && tile.x < zone.x + zone.width && tile.x + tile.width > zone.x && tile.y < zone.y + zone.height && tile.y + tile.height > zone.y;
        return {...zone, isHovered: isHovering };
    }));
    renderCanvas();
  };
  const handleMouseUp = (event) => {
    if (validationState !== 'pending') { isDraggingRef.current = false; draggedTileInfoRef.current = null; renderCanvas(); return; }
    if (!isDraggingRef.current || !draggedTileInfoRef.current) return;
    const { tile: draggedVisualTile, originalTileId } = draggedTileInfoRef.current;
    let snappedInPlace = false;
    for (const zone of dropZones) {
      const tileCenterX = draggedVisualTile.x + draggedVisualTile.width / 2;
      const tileCenterY = draggedVisualTile.y + draggedVisualTile.height / 2;
      if (!zone.letter && tileCenterX > zone.x && tileCenterX < zone.x + zone.width && tileCenterY > zone.y && tileCenterY < zone.y + zone.height) {
        setLetterTiles(prevTiles => prevTiles.map(t => {
          if (t.id === originalTileId) { return { ...t, x: zone.x + (zone.width - t.width) / 2, y: zone.y + (zone.height - t.height) / 2, isDragging: false, isSnapped: true, snappedZoneId: zone.id, color: t.isDistractor ? DISTRACTOR_TILE_COLOR : TILE_COLOR_DEFAULT }; }
          return t;
        }));
        setDropZones(prevZones => prevZones.map(z => z.id === zone.id ? { ...z, letter: draggedVisualTile.letter, isHovered: false, color: DROP_ZONE_COLOR_DEFAULT } : {...z, isHovered: false, color: DROP_ZONE_COLOR_DEFAULT } ));
        snappedInPlace = true; break;
      }
    }
    if (!snappedInPlace) {
      setLetterTiles(prevTiles => prevTiles.map(t => {
        if (t.id === originalTileId) { return { ...t, isDragging: false, isSnapped: false, snappedZoneId: null, x: t.originalX, y: t.originalY, color: t.isDistractor ? DISTRACTOR_TILE_COLOR : TILE_COLOR_DEFAULT }; }
        return t;
      }));
    }
    setDropZones(prevZones => prevZones.map(z => ({...z, isHovered: false, color: DROP_ZONE_COLOR_DEFAULT })));
    isDraggingRef.current = false; draggedTileInfoRef.current = null;
  };

  const handleMouseOut = () => { if (isDraggingRef.current) { handleMouseUp(null); }};
  const handleTouchStart = (event) => { event.preventDefault(); if (event.touches.length === 1) { const touch = event.touches[0]; handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY }); }};
  const handleTouchMove = (event) => { event.preventDefault(); if (event.touches.length === 1 && isDraggingRef.current) { const touch = event.touches[0]; handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });}};
  const handleTouchEnd = (event) => { event.preventDefault(); if (event.changedTouches.length === 1) { const touch = event.changedTouches[0]; handleMouseUp({ clientX: touch.clientX, clientY: touch.clientY }); }};

  useEffect(() => {
      const canvas = canvasRef.current; if (!canvas) return;
      const context = canvas.getContext('2d'); if (!context) return;
      contextRef.current = context;
      setCurrentWordIndex(0);
      canvas.addEventListener('mousedown', handleMouseDown); canvas.addEventListener('mousemove', handleMouseMove); canvas.addEventListener('mouseup', handleMouseUp); canvas.addEventListener('mouseout', handleMouseOut);
      canvas.addEventListener('touchstart', handleTouchStart, { passive: false }); canvas.addEventListener('touchmove', handleTouchMove, { passive: false }); canvas.addEventListener('touchend', handleTouchEnd); canvas.addEventListener('touchcancel', handleTouchEnd);
      return () => {
        canvas.removeEventListener('mousedown', handleMouseDown); canvas.removeEventListener('mousemove', handleMouseMove); canvas.removeEventListener('mouseup', handleMouseUp); canvas.removeEventListener('mouseout', handleMouseOut);
        canvas.removeEventListener('touchstart', handleTouchStart); canvas.removeEventListener('touchmove', handleTouchMove); canvas.removeEventListener('touchend', handleTouchEnd); canvas.removeEventListener('touchcancel', handleTouchEnd);
        if (progressionTimeoutRef.current) clearTimeout(progressionTimeoutRef.current);
      };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!currentWordObj) return;
    setLetterTiles(generateTilesForWord(currentWordObj));
    setDropZones(initialDropZones.map((dz, index) => ({...dz, letter: null, isHovered: false, color: DROP_ZONE_COLOR_DEFAULT, expectedLetter: currentWordObj.word[index] || '' })));
    setValidationState('pending');
  }, [currentWordIndex, currentWordObj]);

  useEffect(() => {
    if (contextRef.current && currentWordObj && (letterTiles.length > 0 || currentWordObj.word) && dropZones.length > 0) {
      renderCanvas();
    }
  }, [renderCanvas]);

  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '20px',
        width: '100%',
        maxWidth: `${CANVAS_WIDTH}px`,
        margin: '20px auto'
      }}
    >
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{
          border: '1px solid #1a1a18',
          width: '100%',
          height: 'auto',
          maxWidth: `${CANVAS_WIDTH}px`,
          display: 'block'
        }}
      >
        Your browser does not support the HTML5 canvas tag.
      </canvas>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="outlined" onClick={handleReset}>Reset Word</Button>
        <Button variant="outlined" onClick={() => { setCurrentWordIndex(prevIndex => (prevIndex + 1) % cvcWordList.length); }}>Next Word (Test)</Button>
      </Box>
    </div>
  );
};
export default CVCCanvasActivity;
