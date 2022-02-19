import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "./services/api";

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[],
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}
export const TransactionsContext = createContext<TransactionsContextData>( {} as TransactionsContextData );

interface Transaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createdAt: string,
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>




export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
    
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('/transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

    const createTransaction = async(transactionInput: TransactionInput) => {
        const response = await api.post('/transactions', {...transactionInput, createdAt: new Date()});
        const { transaction } = response.data;

        setTransactions([...transactions, transaction]);

    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            { children }
        </TransactionsContext.Provider>
    )
}