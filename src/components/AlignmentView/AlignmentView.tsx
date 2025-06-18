import { useEffect, useState, useRef, type RefObject } from "react";

import { Typography, Box, alpha } from "@mui/material";
import { AMINO_ACID_COLORS } from "./aminoAcidColors";
import type { Sequences } from "@types";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

const AlignmentView: React.FC<Sequences> = ({ sequence1, sequence2 }) => {
  const [activeLayer, setActiveLayer] = useState<"top" | "bottom" | null>(null);

  const CopyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
  const handleSelectionChange = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();

    if (selection && CopyRef.current?.contains(selection.anchorNode)) {
      const cleaned = selectedText?.replace(/\s+/g, "");
      if (cleaned) {
        copy(cleaned);
        toast.success("Выделенный участок скопирован");
      }
    }
  };

  document.addEventListener("mouseup", handleSelectionChange);
  return () => {
    document.removeEventListener("mouseup", handleSelectionChange);
  };
}, []);

  return (
    <Box
      ref={CopyRef}      
      maxWidth={600}
      sx={{
        mt: 3,
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        position: "relative",
        margin: 2,
      }}
    >
      {/* Верхняя последовательность */}
      <Typography
        component="p"
        sx={{          
          pointerEvents: "none",
          userSelect: "none",
        }}
        lineHeight={3.5}
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
        sx={{
          position: "absolute",
          top: 25,
          left: 0,
          pointerEvents: "none",
          userSelect: "none",
        }}
        lineHeight={3.5}
        fontFamily="monospace"
      >
        {sequence2.split("").map((char, index) => (
          <Typography
            key={`bottom-${index}`}
            component="mark"
            fontFamily="monospace"
            sx={{
              backgroundColor:
                sequence1[index] !== char
                  ? alpha(AMINO_ACID_COLORS[char], 0.6)
                  : "transparent",
              color: "transparent",
              p: 0.4,
              lineHeight: "inherit",
              borderRadius: 8
            }}
          >
            {char}
          </Typography>
        ))}
      </Typography>

      {/* Верхняя последовательность */}
      <Typography
        onMouseDown={(e) => {
          const tag = e.target.nodeName;
          if (tag === "P") {
            setActiveLayer("top");
          } else if (tag === "SPAN") {
            setActiveLayer("bottom");
          }
        }}
        component="p"
        sx={{
          position: "absolute",
          top: 12.5,
          left: 0,          
          bottom: 12.5,
          zIndex: activeLayer === "bottom" ? 2 : 1,
          display: "flex",
          flexWrap: "wrap",
          alignContent: "space-between",
          ...(activeLayer === "top" && { cursor: "default" })
        }}
        fontFamily="monospace"
      >
        {sequence1.split("").map((char, index) => (
          <Typography
            key={`top-${index}`}
            component="span"
            fontFamily="monospace"
            sx={{
              color: "text.primary",
              p: 0.4,
              lineHeight: "inherit",
              verticalAlign: "top",
              ...(activeLayer === "bottom" && { cursor: "text" })
            }}
          >
            {char}
          </Typography>
        ))}
      </Typography>

      {/* Нижняя последовательность */}
      <Typography
        onMouseDown={(e) => {
          const tag = e.target.nodeName;
          if (tag === "P") {
            setActiveLayer("bottom");
          } else if (tag === "SPAN") {
            setActiveLayer("top");
          }
        }}
        component="p"
        sx={{
          position: "absolute",
          top: 37.5,
          left: 0,          
          bottom: -12,
          zIndex: activeLayer === "top" ? 2 : 1,
          display: "flex",
          flexWrap: "wrap",
          alignContent: "space-between",
          
          ...(activeLayer === "bottom" && { cursor: "default" })
        }}
      >
        {sequence2.split("").map((char, index) => (
          <Typography
            key={`bottom-${index}`}
            component="span"
            fontFamily="monospace"
            sx={(theme) => ({
              color: alpha(theme.palette.text.primary, 0.6),
              p: 0.4,
              lineHeight: "inherit",
              verticalAlign: "top",
              ...(activeLayer === "top" && { cursor: "text" }),
            })}
          >
            {char}
          </Typography>
        ))}
      </Typography>
    </Box>
  );
};

export default AlignmentView;
