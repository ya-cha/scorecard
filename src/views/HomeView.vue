<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'

interface Boulder {
  number: number
  z: boolean
  t: boolean
}

const boulders = ref<Boulder[]>([])

// Alle 90 Boulder initialisieren
const initializeBoulders = () => {
  boulders.value = Array.from({ length: 90 }, (_, i) => ({
    number: i + 1,
    z: false,
    t: false
  }))
}

// Daten aus dem lokalen Speicher laden
const loadData = () => {
  const savedData = localStorage.getItem('scorecard-data')
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData)
      boulders.value = parsedData
    } catch (error) {
      console.error('Fehler beim Laden der Daten:', error)
      initializeBoulders()
    }
  } else {
    initializeBoulders()
  }
}

// Zone umschalten
const toggleZone = (boulder: Boulder) => {
  if (!boulder.t) {
    boulder.z = !boulder.z
    saveData()
  }
}

// Top umschalten
const toggleTop = (boulder: Boulder) => {
  boulder.t = !boulder.t
  // Wenn T angekreuzt wird, wird Z automatisch auch angekreuzt
  if (boulder.t && !boulder.z) {
    boulder.z = true
  }
  saveData()
}

// Daten im lokalen Speicher speichern
const saveData = () => {
  localStorage.setItem('scorecard-data', JSON.stringify(boulders.value))
}

// Alle Daten löschen
const clearAllData = () => {
  if (confirm('Möchten Sie wirklich alle Daten löschen?')) {
    initializeBoulders()
    localStorage.removeItem('scorecard-data')
  }
}

// Berechnete Eigenschaften für Statistiken
const zCount = computed(() => boulders.value.filter(b => b.z).length)
const tCount = computed(() => boulders.value.filter(b => b.t).length)
const totalBoulders = computed(() => boulders.value.length)
const completionPercentage = computed(() => {
  if (totalBoulders.value === 0) return 0
  return Math.round((tCount.value / totalBoulders.value) * 100)
})

// Daten beim Laden der Komponente laden
onMounted(() => {
  loadData()
})

// Daten automatisch speichern wenn sich etwas ändert
watch(boulders, () => {
  saveData()
}, { deep: true })
</script>

<template>
  <div class="scorecard">
    <header class="header">
      <h1>Scorecard</h1>
      <button @click="clearAllData" class="clear-btn" title="Alle Daten löschen">
        🗑️ Löschen
      </button>
    </header>
    
    <div class="boulder-grid">
      <div 
        v-for="boulder in boulders" 
        :key="boulder.number" 
        class="boulder-item"
        :class="{ 
          'has-z': boulder.z, 
          'has-t': boulder.t 
        }"
      >
        <div class="boulder-number">{{ boulder.number }}</div>
        <div class="button-group">
          <button 
            @click="toggleZone(boulder)"
            class="action-btn zone-btn"
            :class="{ 'active': boulder.z }"
            :disabled="boulder.t"
            title="Zone (Zwischenziel)"
          >
            Z
          </button>
          <button 
            @click="toggleTop(boulder)"
            class="action-btn top-btn"
            :class="{ 'active': boulder.t }"
            title="Top (Vollendung)"
          >
            T
          </button>
        </div>
      </div>
    </div>

    <!-- Statistik-Sektion -->
    <footer class="statistics">
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-number">{{ zCount }}</div>
          <div class="stat-label">Zone (Z)</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ tCount }}</div>
          <div class="stat-label">Top (T)</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ totalBoulders }}</div>
          <div class="stat-label">Gesamt</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ completionPercentage }}%</div>
          <div class="stat-label">Vollendung</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.scorecard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e5e7eb;
}

.header h1 {
  margin: 0;
  color: #1f2937;
  font-size: 2.5rem;
  font-weight: 700;
}

.clear-btn {
  background: #6b7280;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  opacity: 0.8;
}

.clear-btn:hover {
  background: #4b5563;
  transform: translateY(-1px);
  opacity: 1;
}

.boulder-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  flex: 1;
  margin-bottom: 30px;
}

.boulder-item {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.boulder-item:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  transform: translateY(-2px);
}

.boulder-item.has-z {
  border-color: #10b981;
  background: #f0fdf4;
}

.boulder-item.has-t {
  border-color: #f59e0b;
  background: #fffbeb;
}

.boulder-item.has-z.has-t {
  border-color: #f59e0b;
  background: #fffbeb;
}

.boulder-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-btn {
  border: 2px solid #e5e7eb;
  background: white;
  color: #6b7280;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.action-btn:active {
  transform: translateY(0);
}

/* Zone Button Styles */
.zone-btn {
  border-color: #f59e0b;
}

.zone-btn:hover:not(:disabled) {
  background: #f59e0b;
  color: white;
  border-color: #f59e0b;
}

.zone-btn.active {
  background: #f59e0b;
  color: white;
  border-color: #f59e0b;
}

/* Top Button Styles */
.top-btn {
  border-color: #10b981;
}

.top-btn:hover:not(:disabled) {
  background: #10b981;
  color: white;
  border-color: #10b981;
}

.top-btn.active {
  background: #10b981;
  color: white;
  border-color: #10b981;
}

/* Disabled State */
.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #f3f4f6;
  color: #9ca3af;
  border-color: #d1d5db;
}

/* Statistik-Sektion */
.statistics {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border-top: 3px solid #4f46e5;
  margin-top: auto;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  text-align: center;
}

.stat-item {
  padding: 12px 8px;
  border-radius: 8px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  transition: transform 0.2s;
}

.stat-item:hover {
  transform: translateY(-1px);
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .scorecard {
    padding: 16px;
  }
  
  .header {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .boulder-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 12px;
  }
  
  .boulder-item {
    padding: 12px;
  }
  
  .boulder-number {
    font-size: 1.25rem;
    margin-bottom: 12px;
  }

  .action-btn {
    padding: 6px 10px;
    font-size: 0.8rem;
    min-height: 32px;
  }

  .statistics {
    padding: 16px;
  }

  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .stat-label {
    font-size: 0.7rem;
  }
}
</style>
