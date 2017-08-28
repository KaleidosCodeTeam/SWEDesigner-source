########################################################################################################
#                                                                                                      #
#  SWEDesigner - Sviluppato da KaleidosCode (Gruppo progetto di Ingegneria del Software UniPD - 2017)  #
#                                                                                                      #
########################################################################################################

 - Browser supportati:

 	Google Chrome (v58 o superiore)
 	Microsoft Edge


 - Istruzioni per l'installazione:

 	È necessario eseguire la procedura come Utente Amministratore.

 	Per sistema operativo Linux / MacOS:

	 	1. Scaricare ed installare Apache Web Server (usare configurazione della Apache's Web Page Root di default)
	 	2. Scaricare ed installare NodeJS (v6.11.1 o superiore)
	 	3. Spostare la cartella SWEDesigner-source nella directory ./var/www/html (è necessario avere i permessi di scrittura)
	 	4. Da terminale, spostarsi nella directory ./var/www/html/SWEDesigner-source e digitare il comando "./installaserver.sh"

	Per sistema operativo Windows:

 		1. Scaricare ed installare Apache Web Server
	 	2. Scaricare ed installare NodeJS (v6.11.1 o superiore)
 		3. Scaricare ed installare (globalmente) i seguenti pacchetti node
 			- express
 			- multer
 			- mysql
 			- json-fn
 			- archiver
 			- body-parser
 			- unescape
 		4. Spostare la cartella SWEDesigner-source nella directory della Apache's Web Page Root (è necessario avere i permessi di scrittura)


 - Istruzioni per il funzionamento:

	Per sistema operativo Linux / MacOS:

	 	1. Da terminale, spostarsi nella directory ./var/www/html/SWEDesigner-source e digitare il comando "./runserver.sh" per avviare il server
	 	2. Aprire il browser e collegarsi all'indirizzo url http://localhost/SWEDesigner-source/src/webapp/SWEDesigner.html

	Per sistema operativo Windows:

 		1. Da Prompt dei Comandi, spostarsi nella directory della Apache's Web Page Root\SWEDesigner-source\src\server\requestHandler e digitare
 		   il comando "node main.js" per avviare il server
 		2. Aprire il browser e collegarsi all'indirizzo url http://localhost/SWEDesigner-source/src/webapp/SWEDesigner.html
