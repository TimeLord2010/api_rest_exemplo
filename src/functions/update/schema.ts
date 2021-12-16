export default {
    type: "object",
    properties: {
      name: { type: 'string' },
      addProps : {
          type: 'object'
      },
      removeProps: {
          type: 'array'
      }
    },
    required: ['name']
  } as const;  