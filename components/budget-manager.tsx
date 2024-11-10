'use client'

import {useState, useEffect} from 'react'
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
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
import {DollarSign, PlusCircle, MinusCircle, Wallet, Edit, Trash} from "lucide-react"

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
    const [newIncome, setNewIncome] = useState({source: '', amount: ''})
    const [newExpense, setNewExpense] = useState({description: '', amount: '', category: ''})
    const [editingIncome, setEditingIncome] = useState<IncomeItem | null>(null)
    const [editingExpense, setEditingExpense] = useState<ExpenseItem | null>(null)

    const totalIncome = income.reduce((sum, item) => sum + item.amount, 0)
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0)
    const balance = totalIncome - totalExpenses

    useEffect(() => {
        const savedIncome = localStorage.getItem('income')
        const savedExpenses = localStorage.getItem('expenses')
        if (savedIncome) setIncome(JSON.parse(savedIncome))
        if (savedExpenses) setExpenses(JSON.parse(savedExpenses))
    }, [])

    useEffect(() => {
        localStorage.setItem('income', JSON.stringify(income))
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }, [income, expenses])

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

    const handleEditIncome = (item: IncomeItem) => {
        setEditingIncome(item)
    }

    const handleEditExpense = (item: ExpenseItem) => {
        setEditingExpense(item)
    }

    const handleUpdateIncome = () => {
        if (editingIncome) {
            setIncome(income.map(item => item.id === editingIncome.id ? editingIncome : item))
            setEditingIncome(null)
        }
    }

    const handleUpdateExpense = () => {
        if (editingExpense) {
            setExpenses(expenses.map(item => item.id === editingExpense.id ? editingExpense : item))
            setEditingExpense(null)
        }
    }

    const handleDeleteIncome = (id: number) => {
        setIncome(income.filter(item => item.id !== id))
    }

    const handleDeleteExpense = (id: number) => {
        setExpenses(expenses.filter(item => item.id !== id))
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
                                <DialogTitle>Add New Income</DialogTitle>
                                <DialogDescription>Add a new source of income to your budget.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="source">Source</Label>
                                    <Input
                                        id="source"
                                        placeholder="e.g. Salary, Freelance"
                                        value={newIncome.source}
                                        onChange={(e) => setNewIncome({...newIncome, source: e.target.value})}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        placeholder="Enter amount"
                                        value={newIncome.amount}
                                        onChange={(e) => setNewIncome({...newIncome, amount: e.target.value})}
                                    />
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

            <div className="grid gap-6 md:grid-cols-3 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                        <MinusCircle className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Balance</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${balance.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Income</CardTitle>
                        <CardDescription>Your sources of income</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {income.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Source</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {income.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.source}</TableCell>
                                            <TableCell
                                                className="text-right">${item.amount.toLocaleString()}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon"
                                                        onClick={() => handleEditIncome(item)}>
                                                    <Edit className="h-4 w-4"/>
                                                </Button>
                                                <Button variant="ghost" size="icon"
                                                        onClick={() => handleDeleteIncome(item.id)}>
                                                    <Trash className="h-4 w-4"/>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <DollarSign className="h-12 w-12 text-muted-foreground mb-4"/>
                                <p className="text-sm text-muted-foreground">No income sources added yet</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Expenses</CardTitle>
                        <CardDescription>Your monthly expenses</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {expenses.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {expenses.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>{item.category}</TableCell>
                                            <TableCell
                                                className="text-right">${item.amount.toLocaleString()}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon"
                                                        onClick={() => handleEditExpense(item)}>
                                                    <Edit className="h-4 w-4"/>
                                                </Button>
                                                <Button variant="ghost" size="icon"
                                                        onClick={() => handleDeleteExpense(item.id)}>
                                                    <Trash className="h-4 w-4"/>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <MinusCircle className="h-12 w-12 text-muted-foreground mb-4"/>
                                <p className="text-sm text-muted-foreground">No expenses added yet</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Dialog open={!!editingIncome} onOpenChange={() => setEditingIncome(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Income</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-source">Source</Label>
                            <Input
                                id="edit-source"
                                value={editingIncome?.source || ''}
                                onChange={(e) => setEditingIncome(prev => prev ? {
                                    ...prev,
                                    source: e.target.value
                                } : null)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-amount">Amount</Label>
                            <Input
                                id="edit-amount"
                                type="number"
                                value={editingIncome?.amount || ''}
                                onChange={(e) => setEditingIncome(prev => prev ? {
                                    ...prev,
                                    amount: Number(e.target.value)
                                } : null)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleUpdateIncome}>Update Income</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={!!editingExpense} onOpenChange={() => setEditingExpense(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Expense</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-description">Description</Label>
                            <Input
                                id="edit-description"
                                value={editingExpense?.description || ''}
                                onChange={(e) => setEditingExpense(prev => prev ? {
                                    ...prev,
                                    description: e.target.value
                                } : null)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-amount">Amount</Label>
                            <Input
                                id="edit-amount"

                                type="number"
                                value={editingExpense?.amount || ''}
                                onChange={(e) => setEditingExpense(prev => prev ? {
                                    ...prev,
                                    amount: Number(e.target.value)
                                } : null)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-category">Category</Label>
                            <Input
                                id="edit-category"
                                value={editingExpense?.category || ''}
                                onChange={(e) => setEditingExpense(prev => prev ? {
                                    ...prev,
                                    category: e.target.value
                                } : null)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleUpdateExpense}>Update Expense</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}