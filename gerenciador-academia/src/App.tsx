import React, { useState, useEffect } from 'react';
import { Membro, PlanoDeTreino, Exercicio, Instrutor } from './types/modelos';
import Modal from './components/Modal';
import GerenciarMembro from './components/GerenciarMembro';
import GerenciarPlanos from './components/GerenciarPlanos';
import GerenciarExercicios from './components/GerenciarExercicios';
import GerenciarInstrutor from './components/GerenciarInstrutor';
import './App.css';

const API_BASE_URL = 'http://localhost:5295/api'; 

type ModalType = 'membro' | 'plano' | 'exercicio' | 'instrutor' | null;

function App() {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [planos, setPlanos] = useState<PlanoDeTreino[]>([]);
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [instrutores, setInstrutores] = useState<Instrutor[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  const reloadAllData = async () => {
    try {
      const [membrosRes, planosRes, exerciciosRes, instrutoresRes] = await Promise.all([
        fetch(`${API_BASE_URL}/membros`),
        fetch(`${API_BASE_URL}/planosdetreino`),
        fetch(`${API_BASE_URL}/exercicios`),
        fetch(`${API_BASE_URL}/instrutores`),
      ]);
      setMembros(await membrosRes.json());
      setPlanos(await planosRes.json());
      setExercicios(await exerciciosRes.json());
      setInstrutores(await instrutoresRes.json());
    } catch (error) {
      console.error("Falha ao carregar dados da API:", error);
    }
  };

  useEffect(() => {
    reloadAllData();
  }, []);

  const openModal = (type: ModalType, item: any = null) => {
    setModalType(type);
    setEditingItem(item);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setEditingItem(null);
  };

  const handleGenericSubmit = async (e: React.FormEvent<HTMLFormElement>, endpoint: string, body: any) => {
    e.preventDefault();
    const isEditing = !!editingItem;
    const url = isEditing ? `${API_BASE_URL}/${endpoint}/${editingItem.id}` : `${API_BASE_URL}/${endpoint}`;
    const method = isEditing ? 'PUT' : 'POST';

    const finalBody = isEditing ? { id: editingItem.id, ...body } : body;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalBody),
    });
    
    closeModal();
    reloadAllData();
  };
  
  const handleInstrutorSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const body = { nome: formData.get('nome') as string };
    handleGenericSubmit(e, 'instrutores', body);
  };

  const handleExercicioSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const body = { 
      nome: formData.get('nome') as string,
      grupoMuscular: formData.get('grupoMuscular') as string
    };
    handleGenericSubmit(e, 'exercicios', body);
  };

  const handlePlanoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const body = { nome: formData.get('nome') as string };
    handleGenericSubmit(e, 'planosdetreino', body);
  };

  const handleMemberSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const body = {
      nome: formData.get('nome') as string,
      email: formData.get('email') as string,
      instrutorId: Number(formData.get('instrutorId')),
      planoDeTreinoId: Number(formData.get('planoId')),
    };
    handleGenericSubmit(e, 'membros', body);
  };

  const handleDelete = async (endpoint: string, id: number) => {
    if (window.confirm('Tem certeza que deseja apagar?')) {
      await fetch(`${API_BASE_URL}/${endpoint}/${id}`, { method: 'DELETE' });
      reloadAllData();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fitguys: A Academia do momento</h1>
      </header>
      <main className="main-grid">
        <div className="column">
          <h2>Membros <button className="add-button" onClick={() => openModal('membro')}>+</button></h2>
          <GerenciarMembro
            membros={membros}
            planos={planos}
            instrutores={instrutores}
            onEdit={(membro) => openModal('membro', membro)}
            onDelete={(id) => handleDelete('membros', id)}
          />
        </div>
        <div className="column">
          <h2>Planos de Treino <button className="add-button" onClick={() => openModal('plano')}>+</button></h2>
          <GerenciarPlanos
            planos={planos}
            exercicios={[]} 
            onEdit={(plano) => openModal('plano', plano)}
            onDelete={(id) => handleDelete('planosdetreino', id)}
          />
        </div>
        <div className="column">
          <h2>Exercícios <button className="add-button" onClick={() => openModal('exercicio')}>+</button></h2>
          <GerenciarExercicios
            exercicios={exercicios}
            onEdit={(exercicio) => openModal('exercicio', exercicio)}
            onDelete={(id) => handleDelete('exercicios', id)}
          />
        </div>
        <div className="column">
          <h2>Instrutores <button className="add-button" onClick={() => openModal('instrutor')}>+</button></h2>
          <GerenciarInstrutor
            instrutores={instrutores}
            onEdit={(instrutor) => openModal('instrutor', instrutor)}
            onDelete={(id) => handleDelete('instrutores', id)}
          />
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalType === 'membro' && (
          <form className="modal-form" onSubmit={handleMemberSubmit}>
            <h3>{editingItem ? 'Editar Membro' : 'Novo Membro'}</h3>
            <label>Nome</label>
            <input name="nome" defaultValue={editingItem?.nome} required />
            <label>Email</label>
            <input name="email" type="email" defaultValue={editingItem?.email} required />
            <label>Instrutor</label>
            <select name="instrutorId" defaultValue={editingItem?.instrutorId} required>
              <option value="">Selecione...</option>
              {instrutores.map(i => <option key={i.id} value={i.id}>{i.nome}</option>)}
            </select>
            <label>Plano de Treino</label>
            <select name="planoId" defaultValue={editingItem?.planoDeTreinoId} required>
              <option value="">Selecione...</option>
              {planos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
            </select>
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={closeModal}>Cancelar</button>
              <button type="submit" className="btn-primary">Salvar</button>
            </div>
          </form>
        )}

        {modalType === 'plano' && (
          <form className="modal-form" onSubmit={handlePlanoSubmit}>
            <h3>{editingItem ? 'Editar Plano' : 'Novo Plano'}</h3>
            <label>Nome do Plano</label>
            <input name="nome" defaultValue={editingItem?.nome} required />
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={closeModal}>Cancelar</button>
              <button type="submit" className="btn-primary">Salvar</button>
            </div>
          </form>
        )}

        {modalType === 'exercicio' && (
          <form className="modal-form" onSubmit={handleExercicioSubmit}>
            <h3>{editingItem ? 'Editar Exercício' : 'Novo Exercício'}</h3>
            <label>Nome do Exercício</label>
            <input name="nome" defaultValue={editingItem?.nome} required />
            <label>Grupo Muscular</label>
            <input name="grupoMuscular" defaultValue={editingItem?.grupoMuscular} required />
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={closeModal}>Cancelar</button>
              <button type="submit" className="btn-primary">Salvar</button>
            </div>
          </form>
        )}

        {modalType === 'instrutor' && (
          <form className="modal-form" onSubmit={handleInstrutorSubmit}>
            <h3>{editingItem ? 'Editar Instrutor' : 'Novo Instrutor'}</h3>
            <label>Nome</label>
            <input name="nome" defaultValue={editingItem?.nome} required />
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={closeModal}>Cancelar</button>
              <button type="submit" className="btn-primary">Salvar</button>
            </div>
          </form>
        )}
      </Modal>

      <footer style={{padding: "2rem", color: "#FFFFFF", textAlign: 'center'}}>
        <p><a style={{color: "white"}} href="https://github.com/LuisEduMartins/gerenciador-academia-com-backend">Link do Repositório</a></p>
      </footer>
    </div>
  );
}

export default App;