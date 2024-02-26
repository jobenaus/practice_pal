# Practice Pal
## Requirements
- Anki for Windows/Mac/Linux (https://apps.ankiweb.net/)

## Pre-Setup
Only if you have used Anki before on this device, you need to reset all settings:
1. Press "Win+R", type "%appdata%", and click "OK".
![](image.png)

2. Look for the folder "Anki2" and open it.
![](image2.png)

3. To reset all Anki settings, look for the file "prefs21" and delete it.
![](image3.png)

## Setup
1. Start Anki, select the language "English (United States)", and confirm. It is very important to select the language "English (United States)" otherwise it will not work!
![](image4.png)
Afterwards, you can change the language back to "German" the following way:
- In the menu bar, click "Tools" -> "Preferences".
- Under "General" -> "Language", select "Deutsch" and click "OK".
- Restart Anki for the changes to take effect.

2. Install the Anki-Connect plugin:
- In the menu bar, click "Extras" -> "Erweiterungen".
- On the top right side, click "Erweiterungen herunterladen...".
- Insert the code for [Anki-Connect](https://ankiweb.net/shared/info/2055492159) "2055492159" and click "OK".

3. Configure AnkiConnect:
- After AnkiConnect is installed, on the bottom right side, click "Konfiguration".
- Add the following URL to the "WebCorsOriginList": "https://practice-pal.vercel.app". It is important to not include the "/" at the end of the URL.
![](image5.png)
- Restart Anki for the changes to take effect.

## Usage
1. Go to [https://practice-pal.vercel.app/](https://practice-pal.vercel.app/).
2. Open Anki for PC/Mac/Linux with AnkiConnect installed.
3. Enter a name for the Anki Deck you want to create.
4. Enter the number of bars you want to practice.
5. Press Generate Deck.
6. Check if the Deck was created correctly.
