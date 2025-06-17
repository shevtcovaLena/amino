import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import { z } from "zod";
import type { Sequences } from "@types";

const AMINO_ACID_REGEX = /^[ARNDCEQGHILKMFPSTWYV-]+$/i;

const schema = z
  .object({
    sequence1: z
      .string()
      .min(1, "Обязательное поле")
      .regex(AMINO_ACID_REGEX, "Введены недопустимые символы"),
    sequence2: z
      .string()
      .min(1, "Обязательное поле")
      .regex(AMINO_ACID_REGEX, "Введены недопустимые символы"),
  })
  .refine((data) => data.sequence1.length === data.sequence2.length, {
    message: "Последовательности должны быть одной длины",
    path: ["sequence2"],
  });

type FormData = z.infer<typeof schema>;

export default function SequenceAlignmentForm({
  setSequences,
}: {
  sequences: Sequences;
  setSequences: (value: Sequences) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      sequence1: "",
      sequence2: "",
    },
  });

  const onSubmit = (data: FormData) => {
    setSequences(data)
    reset()
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      maxWidth={600}
      display="flex"
      flexDirection="column"
      gap={3}
      padding={2}
    >
      <Typography variant="h5">
        Введите аминокислотные последовательности
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ color: "rgba(0, 0, 0, 0.55)" }}
      >
        * В последовательностях допустимы следующие символы:
        ARNDCEQGHILKMFPSTWYV и "-"{" "}
      </Typography>

      {errors.root && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errors.root.message}
        </Alert>
      )}

      <Stack spacing={3}>
        <TextField
          label="Первая последовательность"
          fullWidth
          spellCheck={false}
          error={!!errors.sequence1}
          helperText={errors.sequence1?.message}
          {...register("sequence1")}
          InputProps={{
            sx: { fontFamily: "monospace" },
          }}
        />

        <TextField
          label="Вторая последовательность"
          fullWidth
          spellCheck={false}
          error={!!errors.sequence2}
          helperText={errors.sequence2?.message}
          {...register("sequence2")}
          InputProps={{
            sx: { fontFamily: "monospace" },
          }}
        />

        <Button type="submit" variant="contained" size="large" fullWidth>
          Выравнивание
        </Button>
      </Stack>
    </Box>
  );
}
