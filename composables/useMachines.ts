import { ref } from 'vue'

interface Machine {
  id: string
  type: string
  number: number
  status: 'available' | 'busy'
  prices: number[]
}

export const useMachines = () => {
  const washers = ref<Machine[]>([])
  const dryers = ref<Machine[]>([])

  const initMachines = () => {
    washers.value = Array.from({ length: 8 }, (_, i) => ({
      id: `washer-${i + 1}`,
      type: 'washer',
      number: i + 1,
      status: 'available',
      prices: [30, 40, 50]
    }))

    dryers.value = Array.from({ length: 8 }, (_, i) => ({
      id: `dryer-${i + 1}`,
      type: 'dryer',
      number: i + 1,
      status: 'available',
      prices: [40, 50, 60]
    }))
  }

  const toggleMachineStatus = (machine: Machine) => {
    machine.status = machine.status === 'available' ? 'busy' : 'available'
  }

  return { washers, dryers, initMachines, toggleMachineStatus }
}