import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions.length
      ? this.transactions.reduce((accTrans, nextTrans) => {
          if (nextTrans.type === 'income') {
            return new Transaction({
              title: 'Total',
              value: accTrans.value + nextTrans.value,
              type: 'income',
            });
          }
          return new Transaction({
            title: 'Total',
            value: accTrans.value,
            type: 'income',
          });
        }, new Transaction({ title: 'Total', value: 0, type: 'income' }))
      : new Transaction({
          title: 'Total',
          value: 0,
          type: 'income',
        });

    const totalOutcome = this.transactions.length
      ? this.transactions.reduce((accTrans, nextTrans) => {
          if (nextTrans.type === 'outcome') {
            return new Transaction({
              title: 'Total',
              value: accTrans.value + nextTrans.value,
              type: 'outcome',
            });
          }
          return new Transaction({
            title: 'Total',
            value: accTrans.value,
            type: 'outcome',
          });
        }, new Transaction({ title: 'Total', value: 0, type: 'income' }))
      : new Transaction({
          title: 'Total',
          value: 0,
          type: 'outcome',
        });

    return {
      income: totalIncome.value,
      outcome: totalOutcome.value,
      total: totalIncome.value - totalOutcome.value,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
