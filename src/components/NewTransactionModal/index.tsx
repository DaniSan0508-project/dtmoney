import { FormEvent, useState } from "react";
import Modal from "react-modal";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { api } from "../../services/api";

import { Container, TransactionTypeContainer, StyledButton } from "./styles";

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}


export const NewTransactionModal = ({ isOpen, onRequestClose }: NewTransactionModalProps) => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    

    const handleCreateNewTransaction = (event:FormEvent) => {
        event.preventDefault();
       
        let data = {
            title,
            value,
            category
        }

        api.post('/transactions', data);
    }

    return (
        <Modal
            isOpen={ isOpen }
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={ closeImg } alt="Fechar Modal"/>
            </button>
        <Container onSubmit={ handleCreateNewTransaction }>
                <h2>Cadastrar Usuário</h2>
                
                <input
                    placeholder="Titulo"
                    value={ title }
                    onChange={ event => setTitle(event.target.value) }
                />

                <input
                    type="number"
                    placeholder="Valor"
                    value={ value }
                    onChange={ event => setValue(Number(event.target.value)) }
                />

                <TransactionTypeContainer>
                    <StyledButton
                        type="button"
                        onClick={() => { setType('deposit') }}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={ incomeImg } alt="Entrada" />
                        <span>Entrada</span>
                    </StyledButton>

                    <StyledButton
                        type="button"
                        onClick={() => { setType('withdraw') }}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={ outcomeImg } alt="Saida" />
                        <span>Saida</span>
                    </StyledButton>
                </TransactionTypeContainer>

                <input
                    placeholder="Categoria"
                    value={ category }
                    onChange={ event => setCategory(event.target.value)}
                />
                <button type="submit">
                    Cadastrar
                </button>
        </Container>
           

        </Modal>
    )
}