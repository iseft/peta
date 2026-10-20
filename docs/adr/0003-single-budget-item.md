# One Budget Item instead of separate Monthly and Annual records

The requirements deck describes Monthly Budget rows and Annual Budget rows as separate things, where a recurring item defined in the Annual Budget must not appear in the Monthly Budget, to avoid counting it twice. We model both as one Budget Item (recurring every N weeks, months or years, or one-off on a date); the Monthly Budget shows every recurring item as a cost per month and the Annual Budget lays every item out on the calendar. With a single record nothing can be counted twice, and users no longer have to remember where an item was created to know where it shows.

## Consequences

- A quarterly cost appears in the Monthly Budget at a third of its amount, unlike the deck.
- Changing a recurring amount "from a date" ends the old Budget Item and starts a new one, so past months keep the plan they had.
