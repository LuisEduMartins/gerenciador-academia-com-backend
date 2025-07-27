import React from 'react';
import { Instrutor } from '../types/modelos';

interface Props {
  instrutores: Instrutor[];
  onEdit: (instrutor: Instrutor) => void;
  onDelete: (id: number) => void;
}

const GerenciarInstrutor: React.FC<Props> = ({ instrutores, onEdit, onDelete }) => {
  return (
    <ul>
      {instrutores.map(instrutor => (
        <li key={instrutor.id}>
          <div className="item-info">
            <strong>{instrutor.nome}</strong>
          </div>
          <div className="item-controls">
            <button onClick={() => onEdit(instrutor)}>Editar✏️</button>
            <button onClick={() => onDelete(instrutor.id)}>Apagar🗑️</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GerenciarInstrutor;