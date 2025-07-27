import React from 'react';
import { Exercicio } from '../types/modelos';

interface Props {
  exercicios: Exercicio[];
  onEdit: (exercicio: Exercicio) => void;
  onDelete: (id: number) => void;
}

const GerenciarExercicio: React.FC<Props> = ({ exercicios, onEdit, onDelete }) => {
  return (
    <ul>
      {exercicios.map(ex => (
        <li key={ex.id}>
          <div className="item-info">
            <strong>{ex.nome}</strong>
            <div className="sub-info">{ex.grupoMuscular}</div>
          </div>
          <div className="item-controls">
            <button onClick={() => onEdit(ex)}>Editar✏️</button>
            <button onClick={() => onDelete(ex.id)}>Apagar🗑️</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GerenciarExercicio;