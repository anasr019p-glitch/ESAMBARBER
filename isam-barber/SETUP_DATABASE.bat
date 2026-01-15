@echo off
echo ==============================================
echo      SETUP AUTOMATICO SUPABASE - ISAM BARBER
echo ==============================================
echo.
echo 1. Effettua il login a Supabase.
echo    Se si apre il browser, conferma il login.
echo    Se ti chiede un token nel terminale, incollalo.
echo.
call npx supabase login
if %errorlevel% neq 0 (
    echo [ERRORE] Login fallito. Riprova.
    pause
    exit /b %errorlevel%
)

echo.
echo 2. Collegamento al progetto Supabase (vpgzwgsagywasrxcracc)...
echo    Se ti chiede la password del database, inseriscila.
echo.
call npx supabase link --project-ref vpgzwgsagywasrxcracc
if %errorlevel% neq 0 (
    echo [ERRORE] Collegamento fallito. Verifica il Project ID o la password.
    pause
    exit /b %errorlevel%
)

echo.
echo 3. Caricamento struttura database (Push)...
echo.
call npx supabase db push
if %errorlevel% neq 0 (
    echo [ERRORE] Push del database fallito.
    pause
    exit /b %errorlevel%
)

echo.
echo ==============================================
echo      SETUP COMPLETATO CON SUCCESSO!
echo ==============================================
echo Ora il database e pronto.
pause
