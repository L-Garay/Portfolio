import React from 'react';
import { WeclomeData } from '../../constants/sharedTypes';
import theme from '../../styles/theme';

export const SMALL_WELCOME_DATA: WeclomeData[] = [
  {
    id: 1,
    letter: 'W',
    delays: {
      enter: 1,
      leave: 3
    },
    color: theme.colors.BLUE_1
  },
  {
    id: 2,
    letter: 'E',
    delays: {
      enter: 1.25,
      leave: 3.25
    }
  },
  {
    id: 3,
    letter: 'L',
    delays: {
      enter: 1.5,
      leave: 3.5
    }
  },
  {
    id: 4,
    letter: 'C',
    delays: {
      enter: 1.75,
      leave: 3.75
    }
  },
  {
    id: 5,
    letter: 'O',
    delays: {
      enter: 2,
      leave: 4
    }
  },
  {
    id: 6,
    letter: 'M',
    delays: {
      enter: 2.25,
      leave: 4.25
    }
  },
  {
    id: 7,
    letter: 'E',
    delays: {
      enter: 2.5,
      leave: 4.5
    }
  },
  {
    id: 100,
    letter: String.fromCharCode(160), // testing for a space
    delays: {
      enter: undefined,
      leave: undefined
    },
    skip: true
  },
  {
    id: 8,
    letter: 'A',
    delays: {
      enter: 2.75,
      leave: 4.75
    },
    color: theme.colors.BLUE_1
  },
  {
    id: 9,
    letter: 'N',
    delays: {
      enter: 3,
      leave: 5
    }
  },
  {
    id: 10,
    letter: 'D',
    delays: {
      enter: 3.25,
      leave: 5.25
    }
  },
  {
    id: 101,
    letter: String.fromCharCode(160), // testing for a space
    delays: {
      enter: undefined,
      leave: undefined
    },
    skip: true
  },
  {
    id: 11,
    letter: 'H',
    delays: {
      enter: 3.5,
      leave: 5.5
    },
    color: theme.colors.BLUE_1
  },
  {
    id: 12,
    letter: 'E',
    delays: {
      enter: 3.75,
      leave: 5.75
    }
  },
  {
    id: 13,
    letter: 'L',
    delays: {
      enter: 4,
      leave: 6
    }
  },
  {
    id: 14,
    letter: 'L',
    delays: {
      enter: 4.25,
      leave: 6.25
    }
  },
  {
    id: 15,
    letter: 'O',
    delays: {
      enter: 4.5,
      leave: 6.5
    }
  }
];

export const MEDIUM_WELCOME_DATA: WeclomeData[] = [
  {
    id: 1,
    letter: 'W',
    delays: {
      enter: 1,
      leave: 3
    },
    color: theme.colors.BLUE_1
  },
  {
    id: 2,
    letter: 'E',
    delays: {
      enter: 1.25,
      leave: 3.25
    }
  },
  {
    id: 3,
    letter: 'L',
    delays: {
      enter: 1.5,
      leave: 3.5
    }
  },
  {
    id: 4,
    letter: 'C',
    delays: {
      enter: 1.75,
      leave: 3.75
    }
  },
  {
    id: 5,
    letter: 'O',
    delays: {
      enter: 2,
      leave: 4
    }
  },
  {
    id: 6,
    letter: 'M',
    delays: {
      enter: 2.25,
      leave: 4.25
    }
  },
  {
    id: 7,
    letter: 'E',
    delays: {
      enter: 2.5,
      leave: 4.5
    }
  },
  {
    id: 8,
    letter: String.fromCharCode(160), // testing for a space
    delays: {
      enter: undefined,
      leave: undefined
    },
    skip: true
  },
  {
    id: 9,
    letter: 'A',
    delays: {
      enter: 2.75,
      leave: 4.75
    },
    color: theme.colors.BLUE_1
  },
  {
    id: 10,
    letter: 'N',
    delays: {
      enter: 3,
      leave: 5
    }
  },
  {
    id: 11,
    letter: 'D',
    delays: {
      enter: 3.25,
      leave: 5.25
    }
  },
  {
    id: 12,
    letter: String.fromCharCode(160), // testing for a space
    delays: {
      enter: undefined,
      leave: undefined
    },
    skip: true
  },
  {
    id: 13,
    letter: 'H',
    delays: {
      enter: 3.5,
      leave: 5.5
    },
    color: theme.colors.BLUE_1
  },
  {
    id: 14,
    letter: 'E',
    delays: {
      enter: 3.75,
      leave: 5.75
    }
  },
  {
    id: 15,
    letter: 'L',
    delays: {
      enter: 4,
      leave: 6
    }
  },
  {
    id: 16,
    letter: 'L',
    delays: {
      enter: 3.75, // NOTE no idea why these two values are acting different
      leave: 5.75 // NOTE no idea why these two values are acting different
    }
  },
  {
    id: 17,
    letter: 'O',
    delays: {
      enter: 4, // NOTE no idea why these two values are acting different
      leave: 6 // NOTE no idea why these two values are acting different
    }
  }
];
