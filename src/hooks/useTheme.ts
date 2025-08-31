'use client'

// This file is deprecated. Use useTheme from @/components/ThemeProvider instead.
// Keeping this file to avoid import errors, but all functionality is in ThemeProvider.

import { useTheme as useThemeFromProvider } from '@/components/ThemeProvider'

export const useTheme = useThemeFromProvider
