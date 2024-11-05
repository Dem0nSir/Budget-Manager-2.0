'use client'

import {useState} from 'react'
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {DollarSign, PlusCircle, MinusCircle, Wallet} from "lucide-react"
import {number} from "prop-types";

interface IncomeItem {
    id: number
    source: string
    amount: number
}

interface ExpenseItem {
    id: number
    description: string
    amount: number
    category: string
}

export default function BudgetManager() {
    const [income, setIncome] = useState<IncomeItem[]>([])
    const [expenses, setExpenses] = useState<ExpenseItem[]>([])
    const [newIncome, setNewIncome] = useState({
        source: '',
        amount: ''
    })
    const [newExpense, setNewExpense] = useState({description: '', amount: '', category: ''})
    const handleAddIncome = () => {
        if (newIncome.source && newIncome.amount) {
            setIncome([...income, {id: Date.now(), source: newIncome.source, amount: Number(newIncome.amount)}])
            setNewIncome({source: '', amount: ''})
        }
    }

    const handleAddExpense = () => {
        if (newExpense.description && newExpense.amount && newExpense.category) {
            setExpenses([...expenses, {
                id: Date.now(),
                description: newExpense.description,
                amount: Number(newExpense.amount),
                category: newExpense.category
            }])
            setNewExpense({description: '', amount: '', category: ''})
        }
    }
    return (
        <div className="container mx-auto py-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Budget Manager</h1>
                    <p className="text-muted-foreground">Track your income and expenses</p>
                </div>
                <div className="flex gap-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4"/>
                                Add Income
                            </Button>

                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Income</DialogTitle>
                                <DialogDescription>Add a new source of income to your budget.</DialogDescription>
                            </DialogHeader>
                            <div className='grid gap-4 py-4'>
                                <div className='grid gap-2'>
                                    <Label htmlFor="source">Source</Label>
                                    <Input
                                        id="source"
                                        placeholder="e.g. Salary, Freelance"
                                        value={newIncome.source}
                                        onChange={(e) => setNewIncome({...newIncome, source: e.target.value})}
                                    />
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input id="amount" placeholder="Enter amount" type="number" value={newIncome.amount}
                                           onChange={(e) => setNewIncome({...newIncome, amount: e.target.value})}/>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleAddIncome}>Add Income</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <MinusCircle className="mr-2 h-4 w-4"/>
                                Add Expense
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Expense</DialogTitle>
                                <DialogDescription>Add a new expense to your budget.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        placeholder="e.g. Rent, Utilities"
                                        value={newExpense.description}
                                        onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        placeholder="Enter amount"
                                        value={newExpense.amount}
                                        onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        placeholder="e.g. Housing, Food"
                                        value={newExpense.category}
                                        onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleAddExpense}>Add Expense</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>


        </div>
    )
}