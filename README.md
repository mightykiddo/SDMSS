Software Development Methodologies Sole Solution - SDMSS

======================================================================================================

SDMSS is a cinema ticket booking system bootstrapped with Create React App and node.js

------------------------------------------------------------------------------------------------------

The system encompasses the the following: 
1.	User Management: Provide support for managing various types of users with 
	distinct profiles and preferences

2.	Cinema Room Management: Support the administration of cinema rooms,
	including the management of seats, and assigning movie sessions to specific
	rooms.

3.	Ticketing System: Facilitate the process of purchasing and issuance of tickets
	for movies sessions. Different ticket types are available for purchase. Automated
	seat allocation can be done based on user preference. On top of that, customers
	have the option to pre-purchase food and beverages.

4.	Customer Reviews and Ratings: Allow customers to submit their feedback and ratings
	based on their experience.

5.	Loyalty Program: Assist in loyalty points accumulation and redemption.

6. 	Reporting Generation: Generate report for relevant information, to gain insight of
	the cinema operations.

======================================================================================================

Installation Instructions

------------------------------------------------------------------------------------------------------
-	Start by following the link, https://github.com/mightykiddo/SDMSS to access the repository.

- 	Check if repository is in the main branch, if not change the branch to main. Proceed to download 
	the zip file by selecting the "Code" button and selecting the "Download ZIP" option.

-	Unzip the folder.

-	Check version of node.js installed on machine by using the command,
	"node -v". 

-	If node.js is not installed, follow the link, https://nodejs.org/en/download to download node.js.
	Select the correct installer for the machine OS.

- 	Visual Studio Code is the recommended compiler. Use the following link: 
	https://code.visualstudio.com/download to install Visual Studio Code. Choose the 
	respective installer for your machine.
	
-	Upon installation of Visual Studio Code, use shortcut "Ctl+Shift+X" to browse extensions.
	In Extensions search bar, search up react. Select "ES7+ React/Redux/React-Native snippets"
	by publisher "dsznajder". 
	
-	Search up and install "Simple React Snippets" by publisher "Burke Holland".

-	Upon installing the extensions, open the unzipped SDMSS folder in Visual Studio Code.

-	After opening the SDMSS folder, open terminal either by using the task bar at the top or using 
	shortcut, "Ctl+Shift+`". Open 11 separate terminals.
	
-	In the individual terminals, run the following 10 commands separately:

	--> npx json-server --watch data/dbreview.json --port 8002
	
	--> npx json-server --watch data/dbloyaltytransaction.json --port 8003
	
	--> npx json-server --watch data/dbloyaltyitems.json --port 8004
	
	--> npx json-server --watch data/dbuser.json --port 8005

	--> npx json-server --watch data/dbfoodanddrink.json --port 9000
	
	--> npx json-server --watch data/dbordertransaction.json --port 8007
	
	--> npx json-server --watch data/dbmovie.json --port 8008
	
	--> npx json-server --watch data/dbmoviesession.json --port 8009
	
	--> npx json-server --watch data/dbRoom.json --port 8010
	
	--> npx json-server --watch data/dbuserprofile.json --port 8011
	
	--> npx json-server --watch data/dbusersession.json --port 8030

	Lastly, after executing the above commands, run the following in the last terminal:
	
	--> npm start
	
	This should automatically open the web application and direct in the machine's default browser.
	
======================================================================================================

Usage Guide

------------------------------------------------------------------------------------------------------

-	New Users can create new account by selecting the "Sign Up" Button

-	Existing Users can proceed to the login page by selecting "Sign In" Button

-	For testing purposes, the following user accounts are:
		System Admin: 
			Username: sj
			Password: 1234
			
		Customer:
			Username: jason
			Password: 1234
		
		Staff: 
			Username: nic
			Password: 1234
			
		Manager:
			Username: hs
			Password: 1234

-	Different users will be redirected to their default pages after logging in.
		
	By adjusting the toggles, system admin are able to do the following:
		-	System Admin can manage user accounts, email address will be used during the search.
		-	System Admin can manage	user profiles (account types).
	
	By adjusting the toggles, managers are able to do the following:
		-	Managers can manage movie titles, movie title will be used during the search.
		-	Managers can manage movie sessions, movie title will be used during the search.
		-	Managers can manage cinema rooms, room name will be used during the search.
		-	Managers can generate reports for total revenue, including the most popular movies.

	After logging in, staffs are able to do the following:
		-	Staff can place order for food and beverages.
		-	Staff can book movie tickets for customers.
		-	Staff can update loyalty status of customers, loyalty transaction ID will be used during
			the search.
		-	Staff can update order status of open orders, order transaction ID will be use during 
			the search.
	
	After logging in, customers are able to do the following:
		-	Customer can book tickets for various movie sessions.
		-	Customer have the option to book different types of tickets.
		- 	Customer can accumulate loyalty points and use them to redeem items.
		-	Customer can submit review and ratings.
		-	Customer can order food and beverages in advance.
		-	New customer can sign up and choose their preferred seats.

======================================================================================================
		
Room for Improvement

------------------------------------------------------------------------------------------------------

Since there is a limited time for this project, there are some areas could be improved.

	1.	User Interface can be improved.
	2.	Upload and host the application in a web server.

======================================================================================================	

Acknowledgements
	
------------------------------------------------------------------------------------------------------

This project is based on Full Modern React Tutorial 
https://youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d	

Many thanks to Mr Lionel Lim for his guidance during the development of this project.

======================================================================================================
