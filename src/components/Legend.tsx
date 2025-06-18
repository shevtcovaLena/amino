import { Box, Typography, Stack } from '@mui/material'

const COLOR_LEGEND = [
  { color: '#FFEA00', label: 'Цистеин — C' },
  { color: '#67E4A6', label: 'Гидрофобные — A, I, L, M, F, W, Y, V, P' },
  { color: '#C4C4C4', label: 'Глицин — G' },
  { color: '#FC9CAC', label: 'Отрицательно заряженные — D, E' },
  { color: '#BB99FF', label: 'Положительно заряженные — K, R' },
  { color: '#80BFFF', label: 'Полярные незаряженные — S, T, H, Q, N' },
]

const AminoAcidColorLegend = () => {
  return (
    <Box display='flex' justifyContent='center'>
      <Stack spacing={1} padding={2}>
      <Typography variant="h6" gutterBottom>
        Цветовая схема выравнивания аминокислот
      </Typography>
        {COLOR_LEGEND.map(({ color, label }, index) => (
          <Box key={index} display="flex" alignItems="center" gap={1.5}>
            <Box
              sx={(theme) => ({
                width: 20,
                height: 20,
                borderRadius: 0.5,
                backgroundColor: color,
                border: theme.palette.divider,
              })}
            />
            <Typography variant="body2">{label}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export default AminoAcidColorLegend