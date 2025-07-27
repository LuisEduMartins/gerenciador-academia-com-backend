import React from 'react';
import { PlanoDeTreino, Exercicio } from '../types/modelos'; 

interface Props {
  planos: PlanoDeTreino[];
  exercicios: Exercicio[];
  onEdit: (plano: PlanoDeTreino) => void;
  onDelete: (id: number) => void;
}

const GerenciarPlanos: React.FC<Props> = ({ planos, onEdit, onDelete }) => {
  return (
    <ul>
      {planos.map(plano => (
        <li key={plano.id}>
          <div className="item-info">
            <strong>{plano.nome}</strong>
          </div>
          <div className="item-controls">
            <button onClick={() => onEdit(plano)}>Editar✏️</button>
            <button onClick={() => onDelete(plano.id)}>Apagar🗑️</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GerenciarPlanos;