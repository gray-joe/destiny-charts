export type BaseActivity = {
  id: string
  name: string
  description?: string
  imageUrl?: string
  subActivities?: BaseActivity[]
}

export type EncounterActivity = BaseActivity

export type SubActivity = BaseActivity & {
  subActivities?: EncounterActivity[]
}

export type MainActivity = BaseActivity & {
  description: string
  imageUrl: string
  subActivities?: SubActivity[]
}

export const activities: MainActivity[] = [
  {
    id: 'raids',
    name: 'Raids',
    description:
      'High-level 6-player activities with complex mechanics and powerful rewards.',
    imageUrl: '/images/activities/raids.jpg',
    subActivities: [
      {
        id: 'root-of-nightmares',
        name: 'Root of Nightmares',
        subActivities: [
          { id: 'ron-boss1', name: 'Cataclysm' },
          { id: 'ron-boss2', name: 'Scission' },
          // ... other encounters
        ],
      },
      // ... other raids
    ],
  },
  {
    id: 'dungeon',
    name: 'Dungeons',
    description:
      '3-player activities featuring challenging encounters and unique mechanics.',
    imageUrl: '/images/activities/dungeons.jpg',
    subActivities: [
      {
        id: 'sundered doctrine',
        name: 'Sundered Doctrine',
        subActivities: [
          { id: 'sundered-encounter1', name: 'Encounter 1' },
          { id: 'sundered-encounter2', name: 'Encounter 2' },
          { id: 'sundered-encounter3', name: 'Encounter 3' },
        ],
      },
      {
        id: 'ghosts-of-the-deep',
        name: 'Ghosts of the Deep',
        // ... sub-activities
      },
      // ... other dungeons
    ],
  },
  {
    id: 'nightfalls',
    name: 'Nightfalls',
    description:
      'Challenging versions of strikes with modifiers and high-tier rewards.',
    imageUrl: '/images/activities/nightfalls.jpg',
    subActivities: [
      { id: 'grandmaster', name: 'Grandmaster' },
      { id: 'master', name: 'Master' },
      { id: 'legend', name: 'Legend' },
    ],
  },
  {
    id: 'pvp',
    name: 'Crucible',
    description:
      'Competitive player-versus-player combat across various game modes.',
    imageUrl: '/images/activities/pvp.jpg',
    subActivities: [
      { id: 'trials', name: 'Trials of Osiris' },
      { id: 'competitive', name: 'Competitive' },
      { id: 'quickplay', name: 'Quickplay' },
    ],
  },
  {
    id: 'gambit',
    name: 'Gambit',
    description:
      'Hybrid PvE and PvP activity featuring banking motes and invading.',
    imageUrl: '/images/activities/gambit.jpg',
  },
  {
    id: 'seasonal',
    name: 'Seasonal Activities',
    description: 'Current season activities with unique mechanics and rewards.',
    imageUrl: '/images/activities/seasonal.jpg',
    subActivities: [
      { id: 'current-seasonal', name: 'Current Season' },
      { id: 'previous-seasonal', name: 'Previous Season' },
    ],
  },
]
