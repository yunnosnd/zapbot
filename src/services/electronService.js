// src/services/electronService.js
import { spawn } from 'cross-spawn';

const electronQrWindow = spawn('electron', ["src/electron.js"], { stdio: 'inherit' });

export default electronQrWindow;