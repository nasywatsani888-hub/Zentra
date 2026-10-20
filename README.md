# ZENTRA - Predictive Bearing Health Monitoring System
> Sistem Early Detection & Diagnosa Kerusakan Komponen Bearing Mesin CNC Berbasis AI LSTM (Hackathon Kembara UNYVerse 2026)

## 📌 Fitur Utama Dashboard Ruang Maintenance
1. **Fleet Health Overview (Multi-Mesin)**: Pemantauan multi-mesin CNC secara terpusat dengan indikator visual zona bahaya (Optimal, Warning, Kritis).
2. **Early Warning Alarm System**: Banner peringatan otomatis dan bunyi alarm berkedip ketika getaran melampaui ambang batas ISO / ambang suhu aman.
3. **Live Waveform Getaran (Recharts)**: Grafik getaran real-time 3-sumbu (X, Y, Z) yang bergerak secara dinamis meniru streaming WebSocket dari ESP32-S3 / Mosquitto MQTT.
4. **Diagnosa AI LSTM (SUBF-v1.0)**: Klasifikasi kerusakan spesifik (*Normal*, *Inner Race Fault*, *Outer Race Fault*, *Ball Fault*) lengkap dengan skor probabilitas akurasi.
5. **Rekomendasi Maintenance & Tombol Teknisi**: Rekomendasi perbaikan otomatis serta tombol penugasan teknisi ke lini produksi secara langsung.
6. **Fitur Tambah Mesin Baru**: Formulir dinamis untuk mendaftarkan node sensor ESP32 baru dan mengonfigurasi batas toleransi getaran & suhu.
7. **Ekspor Laporan (CSV)**: Pengunduhan rekapitulasi data kondisi mesin untuk pelaporan manajerial pabrik.

## 🚀 Cara Menjalankan Web di Laptop
1. Buka terminal di folder ini:
   ```bash
   cd "D:\KULIAH\lomba\UNYVERSE 2026\Web Zentra"
   ```
2. Jalankan server pengembang:
   ```bash
   npm run dev
   ```
3. Buka browser di:
   👉 **http://localhost:3000**
