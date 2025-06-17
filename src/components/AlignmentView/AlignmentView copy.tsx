import { useState } from "react";

import { Typography, Box, alpha, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { AMINO_ACID_COLORS } from "./aminoAcidColors";
import type { Sequences } from "@types";

const AlignmentView: React.FC<Sequences> = ({ sequence1, sequence2 }) => {
  const [activeLayer, setActiveLayer] = useState<"top" | "bottom">("top");

  return (
    <><ToggleButtonGroup
  value={activeLayer}
  exclusive
  onChange={(_, value) => {
    if (value !== null) {
      setActiveLayer(value);
    }
  }}
>
  <ToggleButton value="top">Первая (верхняя)</ToggleButton>
  <ToggleButton value="bottom">Вторая (нижняя)</ToggleButton>
</ToggleButtonGroup>
    <Box
      onClick={(e) => console.log(e)}
      sx={{
        mt: 3,
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        position: "relative",
      }}
    >
        {/* Верхняя последовательность */}

        <Typography
          component="div"
          sx={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
          lineHeight={3.52}
          fontFamily="monospace"
        >
          {sequence1.split("").map((char, index) => (
            <Typography
              key={`top-${index}`}
              component="mark"
              fontFamily="monospace"
              sx={{
                backgroundColor: AMINO_ACID_COLORS[char] || "transparent",
                color: "transparent",
                p: 0.4,
                lineHeight: "inherit",
              }}
            >
              {char}
            </Typography>
          ))}
        </Typography>

        {/* Нижняя последовательность */}
        <Typography
          component="p"
          sx={{ position: "absolute", top: 26.1, left: 0, pointerEvents: "none" }}
          lineHeight={3.5}
        >
          {sequence2.split("").map((char, index) => (
            <Typography
              key={`bottom-${index}`}
              component="mark"
              fontFamily="monospace"
              sx={{
                backgroundColor: sequence1[index] !== char
                  ? alpha(AMINO_ACID_COLORS[char], 0.6)
                  : "transparent",
                color: "transparent",
                p: 0.4,
                lineHeight: "inherit",
                width: 2,
              }}
            >
              {char}
            </Typography>
          ))}
        </Typography>

        {/* Верхняя последовательность */}
        <Typography
          // onClick={() => setActiveLayer('top')}
          component="p"
          sx={{
            position: "absolute",
            top: 12.5,
            left: 0,
            zIndex: activeLayer === 'bottom' ? 2 : 1,
            display: "flex",
            flexWrap: "wrap",
            gap: "26px 0px",
            pointerEvents: "none"
          }}
          fontFamily="monospace"
        >
          {sequence1.split("").map((char, index) => (
            <Typography
              key={`top-${index}`}
              component="span"
              fontFamily="monospace"
              sx={{
                // backgroundColor: AMINO_ACID_COLORS[char] || "transparent",
                color: "text.primary",
                p: 0.4,
                lineHeight: "inherit",
                verticalAlign: "top",
              }}
            >
              {char}
            </Typography>
          ))}
        </Typography>

        {/* Нижняя последовательность */}
        <Typography
          // onClick={() => setActiveLayer('top')}
          component="p"
          sx={{
            position: "absolute",
            top: 37.5,
            left: 0,
            zIndex: activeLayer === 'top' ? 2 : 1,
            display: "flex",
            flexWrap: "wrap",
            gap: "26px 0px",
          }}
        >
          {sequence2.split("").map((char, index) => (
            <Typography
              key={`bottom-${index}`}
              component="span"
              fontFamily="monospace"
              sx={{
                // backgroundColor:
                //   sequence1[index] !== char
                //     ? alpha(AMINO_ACID_COLORS[char], 0.6)
                //     : "transparent",
                color: "text.primary",
                p: 0.4,
                lineHeight: "inherit",
                verticalAlign: "top",
              }}
            >
              {char}
            </Typography>
          ))}
        </Typography>
      </Box></>
  );
};

export default AlignmentView;
