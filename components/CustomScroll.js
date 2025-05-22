import React, { useRef, useState } from 'react';
import {
  ScrollView,
  View,
  Animated,
  PanResponder,
  StyleSheet,
} from 'react-native';

export default function CustomScrollView({
  children,
  horizontal = false,
  style,
  contentContainerStyle,
}) {
  const scrollViewRef = useRef();
  const scrollPos = useRef(new Animated.Value(0)).current;
  const [containerSize, setContainerSize] = useState(1);
  const [contentSize, setContentSize] = useState(1);

  const isVertical = !horizontal;

  const thumbSize = Math.max(
    (containerSize * containerSize) / contentSize,
    20
  );

  const thumbTranslate = scrollPos.interpolate({
    inputRange: [0, Math.max(1, contentSize - containerSize)],
    outputRange: [0, containerSize - thumbSize],
    extrapolate: 'clamp',
  });

  const dragStart = useRef(0);
  const thumbStart = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gesture) => {
        dragStart.current = isVertical ? gesture.y0 : gesture.x0;
        thumbStart.current = scrollPos.__getValue();
      },
      onPanResponderMove: (_, gesture) => {
        const dragDelta = (isVertical ? gesture.moveY : gesture.moveX) - dragStart.current;
        const scrollRatio = (contentSize - containerSize) / (containerSize - thumbSize);
        const newScrollPos = Math.min(Math.max(0, thumbStart.current + dragDelta * scrollRatio), contentSize - containerSize);

        scrollViewRef.current?.scrollTo(
          isVertical ? { y: newScrollPos, animated: false } : { x: newScrollPos, animated: false }
        );
      },
    })
  ).current;

  return (
    <View
      style={[{ flex: 1, position: 'relative' }, style]}
      onLayout={(e) => {
        const layoutSize = isVertical
          ? e.nativeEvent.layout.height
          : e.nativeEvent.layout.width;
        setContainerSize(layoutSize);
      }}
    >
      <ScrollView
        ref={scrollViewRef}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onContentSizeChange={(w, h) => {
          setContentSize(isVertical ? h : w);
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: isVertical
                  ? { y: scrollPos }
                  : { x: scrollPos },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        contentContainerStyle={contentContainerStyle}
      >
        {children}
      </ScrollView>

      {contentSize > containerSize && (
        <View
          style={[
            styles.scrollbarTrack,
            isVertical ? styles.verticalTrack : styles.horizontalTrack,
          ]}
        >
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.thumb,
              isVertical
                ? {
                    height: thumbSize,
                    transform: [{ translateY: thumbTranslate }],
                  }
                : {
                    width: thumbSize,
                    transform: [{ translateX: thumbTranslate }],
                  },
            ]}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollbarTrack: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 3,
  },
  verticalTrack: {
    top: 0,
    bottom: 0,
    right: 2,
    width: 6,
  },
  horizontalTrack: {
    left: 0,
    right: 0,
    bottom: 2,
    height: 6,
  },
  thumb: {
    backgroundColor: '#fff',
    borderRadius: 3,
    position: 'absolute',
    width: 6, // fixed width for vertical
    height: 6, // fixed height for horizontal
  },
});
