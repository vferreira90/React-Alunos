import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Aluno } from "../types/types";
import { createAluno, updateAluno } from '../api/alunos';

interface AlunoFormProps {
  open: boolean;
  handleClose: () => void;
  aluno?: Aluno | null;
  setAlunos: React.Dispatch<React.SetStateAction<Aluno[]>>;
}

const AlunoForm: React.FC<AlunoFormProps> = ({
  open,
  handleClose,
  aluno,
  setAlunos,
}) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [registration_number, setRegistrationNumber] = useState("");
  const [description, setDescription] = useState("");
  const isEditing = Boolean(aluno);

  useEffect(() => {
    if (isEditing && aluno) {
      setId(aluno.id);
      setName(aluno.name);
      setBirthday(aluno.birthday.split("T")[0]);
      setEmail(aluno.email);
      setRegistrationNumber(aluno.registration_number);
      setDescription(aluno.description);
    } else {
      resetFields();
    }
  }, [aluno, isEditing]);

  const resetFields = () => {
    setName("");
    setBirthday("");
    setEmail("");
    setRegistrationNumber("");
    setDescription("");
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const alunoData = {id, name, birthday, email, registration_number, description };

    try {
      if (isEditing && aluno) {
        if (aluno.id) {
          const updatedAluno = await updateAluno(aluno.id, alunoData);
          setAlunos((prev) => prev.map((a) => (a.id === aluno.id ? updatedAluno : a)));
        }
      } else {
        const newAluno = await createAluno(alunoData);
        setAlunos((prev) => [...prev, newAluno]);
        resetFields();
      }
      handleClose();
    } catch (error) {
      resetFields();
      console.error('Erro ao salvar aluno:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEditing ? "Editar Aluno" : "Adicionar Aluno"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nome"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          label="Data de Nascimento"
          type="date"
          fullWidth
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          label="Número de Matrícula"
          type="text"
          fullWidth
          value={registration_number}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          label="Descrição"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {isEditing ? "Salvar" : "Adicionar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlunoForm;
