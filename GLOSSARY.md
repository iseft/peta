# Glossary

Peta (Personal Expense Tracking Application): a personal budgeting app that compares what a user plans to spend with what they actually spend, using the 50/30/20 rule.

## Money

**Default Currency**
The currency a user picks for seeing every total. Amounts in other currencies are converted into it at the rate for their date.
_Avoid:_ base currency, main currency, home currency

## Categorising

**Category**
One of the fixed, system-defined spending or income groups (Housing, Food, Travel, Income, Bank Fee, …). Users cannot create, rename or delete Categories.
_Avoid:_ main category, group, type

**Subcategory**
A user-created subdivision of a Category, such as "Rent" under Housing. Every planned or recorded amount belongs to a Subcategory.
_Avoid:_ category (when the user-created level is meant), tag, label

**Budget Class**
The 50/30/20 bucket a Category belongs to: Need, Want or Saving. Income and Bank Fee have no Budget Class.
_Avoid:_ priority, type, level

**Active Category**
A Category in which the user has at least one Subcategory.
_Avoid:_ enabled category, selected category

## Planning

**Budget Item**
A planned amount in a Subcategory, either recurring (every N weeks, months or years from a start date, until an optional end date) or one-off (on a single date).
_Avoid:_ planned expense, budget entry, record, row

**Monthly Budget**
The view of all recurring Budget Items, each expressed as its cost per month.
_Avoid:_ monthly plan, regular costs

**Annual Budget**
The calendar view of one year: per month, the total of items recurring monthly or more often, plus every rarer occurrence and every one-off Budget Item.
_Avoid:_ yearly plan, annual calendar

**Paid Status**
How much of a one-off Budget Item has been covered by Transactions assigned to it, as a share of its amount.
_Avoid:_ progress, state, completion

## Recording

**Transaction**
Something that actually happened to the user's money on a date, made of one or more Lines.
_Avoid:_ record, expense, entry, item

**Line**
The part of a Transaction that falls into one Subcategory. A Transaction split across categories has several Lines.
_Avoid:_ split, sub-transaction, row

**Assignment**
The link from a Line to the plan it fulfils, such as a one-off Budget Item. An assigned Line takes its Subcategory from what it is assigned to.
_Avoid:_ link, allocation, matching

**Annual Income**
The user's income for the current year: actual income Transactions so far, plus planned income Budget Items for the remaining months.
_Avoid:_ yearly salary, projected income

**Opening Balance**
The money a user already had on the day they started using Peta, from which Available Wealth is counted.
_Avoid:_ starting balance, initial funds

**Available Wealth**
Money that has been neither spent nor put into savings: the Opening Balance plus income, minus spending and Contributions. Shown in red when negative.
_Avoid:_ balance, cash, net worth

**Archived Subcategory**
A Subcategory with history that the user has retired: hidden from pickers, still shown in past plans and charts.
_Avoid:_ deleted subcategory, inactive subcategory

## Saving

**Savings**
The user's single long-term investment pot, spread across Holdings. Every Line in a Subcategory of the Saving Category is a Contribution to it.
_Avoid:_ portfolio, savings goal, investments

**Withdrawal**
Money taken out of Savings or the Emergency Fund. A Withdrawal from Savings returns to Available Wealth and counts as neither spending nor income.
_Avoid:_ payout, redemption

**Fund**
Either Savings or the Emergency Fund: a pot of money spread across Holdings that Contributions go into and Withdrawals come out of.
_Avoid:_ pot, account, goal

**Holding**
One investment that Savings or the Emergency Fund is spread across, with an Asset Class, a target allocation and an expected annual return.
_Avoid:_ asset, investment, position, instrument

**Asset Class**
The kind of a Holding: Stock, Bond or Other.
_Avoid:_ asset type, category

**Contribution**
Money moved from Available Wealth into savings, divided across Holdings by their target allocation.
_Avoid:_ deposit, payment, top-up

**Emergency Fund**
The reserve every user has for unexpected costs. It can be spent at any time, and what is spent from it counts as spending in the Subcategory chosen.
_Avoid:_ rainy-day fund, safety net, buffer

**Months Covered**
How many months the Emergency Fund would pay for the user's Need spending in the Monthly Budget.
_Avoid:_ runway, coverage

**Emergency Fund Target**
The number of Months Covered the user wants, set in their settings.
_Avoid:_ reserve goal, required reserve

## Account

**Payment Details**
A labelled bank account number, IBAN or payment handle (Revolut, Wise) the user can copy with one tap to share. Not tracked as a balance.
_Avoid:_ bank account, wallet, account
