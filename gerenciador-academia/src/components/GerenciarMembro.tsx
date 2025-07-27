import React from 'react';
import { Membro, PlanoDeTreino, Instrutor } from '../types/modelos';

interface Props {
  membros: Membro[];
  planos: PlanoDeTreino[];
  instrutores: Instrutor[];
  onEdit: (membro: Membro) => void;
  onDelete: (id: number) => void;
}

const GerenciarMembro: React.FC<Props> = ({ membros, planos, instrutores, onEdit, onDelete }) => {
  return (
    <ul>
      {membros.map(membro => (
        <li key={membro.id}>
          <div className="item-info">
            <strong>{membro.nome}</strong>
            <div className="sub-info">{membro.email}</div>
            <div className="sub-info">
              Plano: {planos.find(p => p.id === membro.planoDeTreinoId)?.nome || 'N/A'}
            </div>
            <div className="sub-info">
              Instrutor: {instrutores.find(i => i.id === membro.instrutorId)?.nome || 'N/A'}
            </div>
          </div>
          <div className="item-controls">
            <button onClick={() => onEdit(membro)}>Editar✏️</button>
            <button onClick={() => onDelete(membro.id)}>Apagar🗑️</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GerenciarMembro;