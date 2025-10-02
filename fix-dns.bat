@echo off
echo ========================================
echo LIMPIANDO CACHE DNS Y RED
echo ========================================
echo.

echo [1/4] Limpiando cache DNS...
ipconfig /flushdns

echo.
echo [2/4] Liberando IP actual...
ipconfig /release

echo.
echo [3/4] Renovando IP...
ipconfig /renew

echo.
echo [4/4] Limpiando cache NetBIOS...
nbtstat -R

echo.
echo ========================================
echo COMPLETADO!
echo ========================================
echo.
echo Ahora:
echo 1. Cierra todos los navegadores
echo 2. Abre Chrome/Edge en modo incognito
echo 3. Ve a: chrome://net-internals/#dns
echo 4. Click en "Clear host cache"
echo 5. Prueba: https://www.colombiawellnessweek.co
echo.
pause
