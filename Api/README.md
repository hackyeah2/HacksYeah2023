# Setting up virtual env

In powershell:

`python -m venv ./.venv`

`.\.venv\Scripts\activate.ps1`

^if not working run: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted`

Then you can run `pip install -r requirements.txt` and it will apply only to this venv

In vs code to make debug work you have to select proper interpreter: CTRL+SHIFT+P type python interpreter and select venv 