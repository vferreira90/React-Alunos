import React, { useEffect, useState } from "react";
import { Button, Container, List, ListItem, ListItemText, Box, Typography } from "@mui/material";
import AlunoForm from "./Alunos/form";
import { Aluno } from "./types/types";
import { getAlunos, deleteAluno } from "./api/alunos";

const App: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const fetchAlunos = async () => {
    try {
      const alunosData = await getAlunos();
      setAlunos(alunosData);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAluno(id);
      setAlunos((prev) => prev.filter((aluno) => aluno.id !== id));
    } catch (error) {
      console.error("Erro ao deletar aluno:", error);
    }
  };

  const handleEdit = (aluno: Aluno) => {
    setSelectedAluno(aluno);
    setFormOpen(true);
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Typography variant="h4" gutterBottom>
          Alunos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setSelectedAluno(null);
            setFormOpen(true);
          }}
          style={{ marginBottom: "20px" }}
        >
          Adicionar Aluno
        </Button>
        <List>
          {alunos.map((aluno) => (
            <ListItem key={aluno.id}>
              <ListItemText primary={aluno.name} secondary={aluno.email} secondaryTypographyProps={{ style: { color: 'white' } }} />
              <Button onClick={() => handleEdit(aluno)}>Editar</Button>
              <Button onClick={() => handleDelete(aluno.id)} color="secondary">
                Deletar
              </Button>
            </ListItem>
          ))}
        </List>
        <AlunoForm
          open={formOpen}
          handleClose={() => {
            setFormOpen(false);
            setSelectedAluno(null);
          }}
          aluno={selectedAluno}
          setAlunos={setAlunos}
        />
      </Box>
    </Container>
  );
};

export default App;
