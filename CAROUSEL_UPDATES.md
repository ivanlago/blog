# Carousel Updates

## Changes Made

### 1. Carousel Component Updates
- Added `hideIndicators` prop to completely hide the navigation dots
- Fixed all Biome linting errors
- Improved accessibility with proper button types and ARIA labels
- Used `useCallback` for better performance
- Fixed index-based keys by using unique identifiers

### 2. Hero Component Updates
- Updated to use `hideIndicators={true}` prop
- Replaced PostCard with new CarouselItemWithText component

### 3. Page Component Updates
- Updated both carousels to use `hideIndicators={true}` prop
- Replaced PostCard and AdvertisementCard with new CarouselItemWithText component

### 4. New Component: CarouselItemWithText
Created a new component that displays content with text overlay at the bottom-left of images:

- Text positioned at the bottom-left of images
- Gradient background for better text readability
- Responsive design that works on all screen sizes
- Supports both posts and advertisements
- Proper linking to content pages

## Usage

### Hiding Indicators
To hide indicators on any carousel, simply add the `hideIndicators={true}` prop:

```tsx
<Carousel 
  title="My Carousel" 
  hideIndicators={true}
>
  {/* carousel items */}
</Carousel>
```

### Using CarouselItemWithText
The new component can be used for both posts and advertisements:

```tsx
<CarouselItemWithText 
  key={item.id} 
  item={item} 
  type="post" // or "advertisement"
/>
```

## Styling

The text overlay uses:
- Bottom-left positioning with `absolute` positioning
- Gradient background from black/80% to transparent
- White text with blue accents for links
- Responsive sizing with max-width constraint
- Proper spacing and typography hierarchy

## Benefits

1. **Cleaner UI**: No more distracting navigation dots
2. **Better Content Presentation**: Text overlay on images creates a more engaging experience
3. **Consistent Design**: Unified styling across all carousel items
4. **Accessibility**: Proper ARIA labels and semantic HTML
5. **Performance**: Optimized with useCallback and proper React patterns