import { Timestamp } from 'firebase/firestore'

/**
 * Firestore type definitions for the HesAppc im application
 */

export interface GroupInvite {
    groupId: string
    createdBy: string
    createdAt: Timestamp
    expiresAt?: Timestamp
    disabled?: boolean
}

export interface GroupData {
    name: string
    createdBy: string
    createdByName: string
    memberIds: string[]
    balances: Record<string, number>
    totalAmount: number
    createdAt: Timestamp
    archived?: boolean
}

export interface FeedItem {
    type: 'expense' | 'settlement' | 'join' | 'group'
    title: string
    createdAt: Timestamp
    createdBy: string
    createdByName: string
    amount?: number
    groupId?: string
    isPositive?: boolean
    text?: string
    message?: string
    description?: string
    timestamp?: Timestamp
    userName?: string
    user?: {
        name: string
    }
}

export interface ExpenseData {
    description: string
    amount: number
    paidBy: string
    paidByName: string
    splitWith: Record<string, number>
    createdAt: Timestamp
    createdBy: string
    category?: string
    receiptUrl?: string
}

export interface SettlementData {
    from: string
    fromName: string
    to: string
    toName: string
    amount: number
    createdAt: Timestamp
}
