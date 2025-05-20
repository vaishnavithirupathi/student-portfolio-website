import clientPromise from './mongodb';

export async function initializeDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db('student_portfolio');

    // Create collections with validation
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['email', 'password', 'name'],
          properties: {
            email: {
              bsonType: 'string',
              pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
            },
            password: {
              bsonType: 'string',
              minLength: 6
            },
            name: {
              bsonType: 'string',
              minLength: 2
            },
            bio: {
              bsonType: ['string', 'null'],
              description: 'Optional bio'
            },
            skills: {
              bsonType: ['array', 'null'],
              items: {
                bsonType: 'string'
              }
            },
            socialLinks: {
              bsonType: ['object', 'null'],
              properties: {
                github: { bsonType: 'string' },
                linkedin: { bsonType: 'string' },
                twitter: { bsonType: 'string' }
              }
            },
            createdAt: {
              bsonType: 'date'
            },
            updatedAt: {
              bsonType: 'date'
            }
          }
        }
      }
    });

    await db.createCollection('projects', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['userId', 'title', 'description'],
          properties: {
            userId: {
              bsonType: 'objectId'
            },
            title: {
              bsonType: 'string',
              minLength: 1
            },
            description: {
              bsonType: 'string'
            },
            technologies: {
              bsonType: ['string', 'null']
            },
            link: {
              bsonType: ['string', 'null']
            },
            createdAt: {
              bsonType: 'date'
            }
          }
        }
      }
    });

    await db.createCollection('blogs', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['userId', 'title', 'content'],
          properties: {
            userId: {
              bsonType: 'objectId'
            },
            title: {
              bsonType: 'string',
              minLength: 1
            },
            content: {
              bsonType: 'string'
            },
            createdAt: {
              bsonType: 'date'
            }
          }
        }
      }
    });

    await db.createCollection('education', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['userId', 'institution', 'degree', 'field', 'startYear'],
          properties: {
            userId: {
              bsonType: 'objectId'
            },
            institution: {
              bsonType: 'string',
              minLength: 1
            },
            degree: {
              bsonType: 'string'
            },
            field: {
              bsonType: 'string'
            },
            startYear: {
              bsonType: 'string'
            },
            endYear: {
              bsonType: ['string', 'null']
            },
            createdAt: {
              bsonType: 'date'
            }
          }
        }
      }
    });

    // Create indexes
    await db.collection('users').createIndexes([
      { key: { email: 1 }, unique: true },
      { key: { createdAt: 1 } }
    ]);

    await db.collection('projects').createIndexes([
      { key: { userId: 1 } },
      { key: { createdAt: -1 } }
    ]);

    await db.collection('blogs').createIndexes([
      { key: { userId: 1 } },
      { key: { createdAt: -1 } }
    ]);

    await db.collection('education').createIndexes([
      { key: { userId: 1 } },
      { key: { startYear: -1 } }
    ]);

    console.log('Database initialized successfully');
  } catch {
    console.error('Failed to initialize database');
    throw new Error('Failed to initialize database');
  }
}
