import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import back from '../assets/Images/back.png';

const { width, height } = Dimensions.get('window');

export default function Minigame({ navigation }) {
  const playerRef = useRef(null);
  const gameRef = useRef(null);
  const [meteors, setMeteors] = useState([]);
  const [position, setPosition] = useState(50); // % left
  const [isGameOver, setIsGameOver] = useState(false);
  const [showControls, setShowControls] = useState(true); // Show controls for 3 seconds
  const [score, setScore] = useState(0); // Score state

  // Move player left/right with keys
  const handleKeyDown = (e) => {
    if (isGameOver) return;
    if (e.key === 'ArrowLeft' || e.key === 'a') setPosition((prev) => Math.max(0, prev - 5));
    if (e.key === 'ArrowRight' || e.key === 'd') setPosition((prev) => Math.min(90, prev + 5));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGameOver]);

  // Spawn meteors periodically
  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      const left = Math.random() * 90;
      setMeteors((prev) => [...prev, { id: Date.now(), top: 0, left }]);
    }, 800);
    return () => clearInterval(interval);
  }, [isGameOver]);

  // Animate meteors falling
  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      setMeteors((prev) =>
        prev
          .map((m) => ({ ...m, top: m.top + 5 }))
          .filter((m) => m.top < 100)
      );
    }, 100);
    return () => clearInterval(interval);
  }, [isGameOver]);

  // Collision detection & scoring
  useEffect(() => {
    if (isGameOver) return;

    const playerRect = playerRef.current?.getBoundingClientRect();
    const gameRect = gameRef.current?.getBoundingClientRect();

    meteors.forEach((m) => {
      const meteorX = (m.left / 100) * gameRect.width;
      const meteorY = (m.top / 100) * gameRect.height;

      if (
        playerRect &&
        meteorX < playerRect.right - gameRect.left &&
        meteorX + 30 > playerRect.left - gameRect.left &&
        meteorY + 30 > playerRect.top - gameRect.top
      ) {
        setIsGameOver(true);
      }
    });

    // Increment score if game not over
    if (!isGameOver) {
      setScore((prevScore) => prevScore + 1);
    }
  }, [meteors, isGameOver]);

  // Restart game
  const restartGame = () => {
    setMeteors([]);
    setPosition(50);
    setIsGameOver(false);
    setScore(0);
  };

  // Show controls for first 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.gameContainer} ref={gameRef}>
      {/* Score */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>

      {/* Controls instructions */}
      {showControls && (
        <View style={styles.controlsContainer}>
          <Text style={styles.controlsText}>Controls:</Text>
          <Text style={styles.controlsText}>Use Arrow Left/Right or A/D to move</Text>
        </View>
      )}

      {/* Meteors */}
      {meteors.map((m) => (
        <View key={m.id} style={[styles.meteor, { top: `${m.top}%`, left: `${m.left}%` }]}>
          <Image source={{ uri: 'https://emojicdn.elk.sh/☄️' }} style={styles.meteorImage} />
        </View>
      ))}

      {/* Player */}
      <View ref={playerRef} style={[styles.player, { left: `${position}%` }]}>
        <Image source={{ uri: 'https://emojicdn.elk.sh/🚀' }} style={styles.playerImage} />
      </View>

      {/* Touch controls */}
      <View style={styles.touchControls}>
        <TouchableOpacity onPress={() => setPosition((prev) => Math.max(0, prev - 5))} style={styles.controlButton}>
          <Text style={styles.controlButtonText}>◀️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPosition((prev) => Math.min(90, prev + 5))} style={styles.controlButton}>
          <Text style={styles.controlButtonText}>▶️</Text>
        </TouchableOpacity>
      </View>

      {/* Game Over overlay */}
      {isGameOver && (
        <View style={styles.gameOverContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={back} style={{ width: 30, height: 30, alignSelf: 'flex-start' }} />
          </TouchableOpacity>
          <Text style={styles.gameOverText}>💥 Game Over 💥</Text>
          <Text style={styles.scoreText}>Your Score: {score}</Text>
          <TouchableOpacity style={styles.gameOverButton} onPress={restartGame}>
            <Text style={styles.gameOverButtonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  player: {
    position: 'absolute',
    bottom: 20,
    width: 40,
    height: 40,
  },
  playerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  meteor: {
    position: 'absolute',
    width: 30,
    height: 30,
  },
  meteorImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  controlsContainer: {
    position: 'absolute',
    top: '20%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    borderRadius: 10,
    textAlign: 'center',
  },
  controlsText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  gameOverContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  gameOverText: {
    fontSize: 36,
    color: 'white',
  },
  scoreContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  scoreText: {
    fontSize: 24,
    color: 'white',
  },
  gameOverButton: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  gameOverButtonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  controlButton: {
    backgroundColor: 'rgba(51, 51, 51, 0.6)',
    padding: 20,
    borderRadius: 50,
    marginHorizontal: 30,
  },
  touchControls: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 28,
  },
});
