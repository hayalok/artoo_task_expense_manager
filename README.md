Bounty-Bot-Expenses

There are two sections of this application

	A. To insert transactions from irc chat.
	B. To fetch details via exposed apis.
	
	
---------------------------------------------------------------------------------------------
A. To insert expense info into application. We need to put like this.

@bot toget 6000 from Rahul

1. "@bot" signifies that it is comment we need to process in order to persist expense details.
2. "toget" signifies that this transaction is negative or positive in terms of money.

	2.1 "toget" when money will be given to the user.
	2.2 "paid" when money is paid by the user.
	 eg.  @bot paid 6000 as rent
	 or.  @bot toget 500 from railway ticket cancellation
---------------------------------------------------------------------------------------------

B. To get details via exposed apis

Api 1

/transaction/:user_id/:from/:to 

this api will fetch info regarding username = user_id for time period "from" and "to" where date format is yyyy-mm-dd.

This will provide a summary and all transaction for that user in that mentioned period.

{
    "summary": {
        "Amount paid": 19000,
        "Amount to get": 12000,
        "Net Total": -7000
    },
    "transactions": [
        {
            "id": 4,
            "username": "alok_",
            "value": 6000,
            "expense_info": "for rent in feb",
            "type": "paid",
            "createdAt": "2018-01-07T08:17:35.000Z",
            "updatedAt": "2018-01-07T08:17:35.000Z"
        },
        {
            "id": 5,
            "username": "alok_",
            "value": 7000,
            "expense_info": "for rent in feb",
            "type": "paid",
            "createdAt": "2018-01-07T08:18:31.000Z",
            "updatedAt": "2018-01-07T08:18:31.000Z"
        }
    ]
}
---------------------------------------------------------------
Api 2

/transaction/:user_id

This api will fetch info regarding that user for all times.

Reponse structure is same as above.

---------------------------------------------------------------
Api 3

/all/total/:from/:to

This api will fetch summary of all the users for that mentioned period.

Response Structure

[
    {
        "Name": "hayalok4",
        "Amount paid": 65000,
        "Amount to get": 60000,
        "Net total": -5000
    },
    {
        "Name": "alok_",
        "Amount paid": 19000,
        "Amount to get": 12000,
        "Net total": -7000
    }
] 
---------------------------------------------------------------
Api 4

/all/total

This api will fetch summary details for all times.


Response structure:

[
    {
        "Name": "hayalok4",
        "Amount paid": 65000,
        "Amount to get": 60000,
        "Net total": -5000
    },
    {
        "Name": "alok_",
        "Amount paid": 19000,
        "Amount to get": 12000,
        "Net total": -7000
    }
] 
-----------------------------------------------------------------