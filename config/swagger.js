import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
    title: "Lead Neuro Backend API",
    version: "1.0.0",
   description:`REST API for Lead Neuro Backend.

Swagger provides interactive API testing.

For complete request examples and collections, see the Postman documentation.
`
},

externalDocs: {
  description: "Complete Postman API Documentation",
  url: "https://documenter.getpostman.com/view/44317742/2sBY4PPLh6"
},

servers: [
  {
    url: "https://leadneurobackend.onrender.com/api/v1",
    description: "Production Server (Render)"
  },
  {
    url: "http://localhost:4000/api/v1",
    description: "Development Server"
  }
],

    tags: [
      {
        name: "Authentication",
        description: "Authentication endpoints"
      },
      {
        name: "Staff",
        description: "Staff management endpoints"
      },
      {
        name: "Doctors",
        description: "Doctor management endpoints"
      },
      {
        name: "Nurses",
        description: "Nurse management endpoints"
      },
      {
        name: "Cleaners",
        description: "Cleaner management endpoints"
      },
      {
        name: "Drugs",
        description: "Drug inventory endpoints"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },

      schemas: {

LoginRequest: {
  type: "object",

  required: [
    "email",
    "password"
  ],

  properties: {
    email: {
      type: "string",
      format: "email",
      example: "john@gmail.com"
    },

    password: {
      type: "string",
      format: "password",
      example: "Password123"
    }
  }
},

LoginResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Login successful"
    },

    data: {
      type: "object",

      properties: {
        staff: {
          $ref: "#/components/schemas/Staff"
        },

        accessToken: {
          type: "string",
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        },

        refreshToken: {
          type: "string",
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
      }
    }
  }
},

ForgotPasswordRequest: {
  type: "object",

  required: [
    "email"
  ],

  properties: {
    email: {
      type: "string",
      format: "email",
      example: "john@gmail.com"
    }
  }
},

ForgotPasswordResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Password reset email sent"
    },

    data: {
      nullable: true,
      example: null
    }
  }
},

ResetPasswordRequest: {
  type: "object",

  required: [
    "email",
    "token",
    "password"
  ],

  properties: {
    email: {
      type: "string",
      format: "email",
      example: "john@gmail.com"
    },

    token: {
      type: "string",
      example: "d1f9b8c4e7f54b2..."
    },

    password: {
      type: "string",
      format: "password",
      example: "NewPassword123"
    }
  }
},

ResetPasswordResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Password reset successful"
    },

    data: {
      nullable: true,
      example: null
    }
  }
},

Staff: {
  type: "object",

  properties: {
    _id: {
      type: "string",
      example: "686f6b8d2b45d12e85d88d1a"
    },

    staffId: {
      type: "string",
      format: "uuid",
      example: "8d35c55f-fb85-4980-91d9-670b5c54d74f"
    },

    name: {
      type: "string",
      example: "John Doe"
    },

    email: {
      type: "string",
      format: "email",
      example: "john@gmail.com"
    },

    phone: {
      type: "string",
      example: "08012345678"
    },

    Address: {
      type: "string",
      example: "Port Harcourt"
    },

    role: {
      type: "string",
      enum: [
        "admin",
        "doctor",
        "nurse",
        "cleaner"
      ],
      example: "doctor"
    },

    department: {
      type: "string",
      example: "Neurology"
    },

    salary: {
      type: "number",
      example: 250000
    },

    dateEmployed: {
      type: "string",
      format: "date-time",
      example: "2026-07-17T10:30:00.000Z"
    },

    createdAt: {
      type: "string",
      format: "date-time",
      example: "2026-07-17T10:30:00.000Z"
    },

    updatedAt: {
      type: "string",
      format: "date-time",
      example: "2026-07-17T10:30:00.000Z"
    }
  }
},

CreateStaffRequest: {
  type: "object",

  required: [
    "name",
    "email",
    "password",
    "phone",
    "Address",
    "role",
    "department",
    "salary"
  ],

  properties: {
    name: {
      type: "string",
      minLength: 3,
      example: "John Doe"
    },

    email: {
      type: "string",
      format: "email",
      example: "john@gmail.com"
    },

    password: {
      type: "string",
      format: "password",
      minLength: 8,
      description: "Must contain at least one uppercase letter and one number.",
      example: "Password123"
    },

    phone: {
      type: "string",
      example: "08012345678"
    },

    Address: {
      type: "string",
      example: "Port Harcourt"
    },

    role: {
      type: "string",
      enum: [
        "admin",
        "doctor",
        "nurse",
        "cleaner"
      ],
      example: "doctor"
    },

    department: {
      type: "string",
      example: "Neurology"
    },

    salary: {
      type: "number",
      example: 250000
    }
  }
},

CreateStaffResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Staff created successfully"
    },

    data: {
      type: "object",

      properties: {
        staff: {
          $ref: "#/components/schemas/Staff"
        },

        accessToken: {
          type: "string",
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        },

        refreshToken: {
          type: "string",
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
      }
    }
  }
},

UpdateStaffRequest: {
  type: "object",

  properties: {
    name: {
      type: "string",
      minLength: 3,
      example: "John Doe"
    },

    email: {
      type: "string",
      format: "email",
      example: "john.updated@gmail.com"
    },

    phone: {
      type: "string",
      example: "08098765432"
    },

    Address: {
      type: "string",
      example: "Warri"
    },

    department: {
      type: "string",
      example: "Neurology"
    },

    role: {
      type: "string",
      enum: [
        "admin",
        "doctor",
        "nurse",
        "cleaner"
      ],
      example: "doctor"
    },

    salary: {
      type: "number",
      example: 300000
    }
  }
},

GetAllStaffResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Staff retrieved successfully"
    },

    data: {
      type: "object",

      properties: {
        currentPage: {
          type: "integer",
          example: 1
        },

        totalPages: {
          type: "integer",
          example: 5
        },

        limit: {
          type: "integer",
          example: 10
        },

        totalItems: {
          type: "integer",
          example: 48
        },

        hasNextPage: {
          type: "boolean",
          example: true
        },

        hasPreviousPage: {
          type: "boolean",
          example: false
        },

        nextPage: {
          type: "integer",
          nullable: true,
          example: 2
        },

        previousPage: {
          type: "integer",
          nullable: true,
          example: null
        },

        totalStaff: {
          type: "integer",
          example: 48
        },

        staff: {
          type: "array",

          items: {
            $ref: "#/components/schemas/Staff"
          }
        }
      }
    }
  }
},

GetStaffByIdResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Staff retrieved successfully"
    },

    data: {
      type: "object",

      properties: {
        staff: {
          $ref: "#/components/schemas/Staff"
        }
      }
    }
  }
},

UpdateStaffResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Staff updated successfully"
    },

    data: {
      $ref: "#/components/schemas/Staff"
    }
  }
},

DeleteStaffResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Staff deleted successfully"
    },

    data: {
      nullable: true,
      example: null
    }
  }
},
ErrorResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: false
    },

    message: {
      type: "string",
      example: "Something went wrong."
    },

    errors: {
      nullable: true,
      description: "Additional error details",
      example: null
    }
  }
},

ValidationErrorResponse: {
  type: "object",

  properties: {
    message: {
      type: "string",
      example: "Validation failed."
    },

    errors: {
      type: "array",

      items: {
        type: "object",

        properties: {
          field: {
            type: "string",
            example: "email"
          },

          message: {
            type: "string",
            example: "Email is required"
          }
        }
      }
    }
  }
},

Doctor: {
  type: "object",

  properties: {
    _id: {
      type: "string",
      example: "6872d7ec85d4c93d8fdf1234"
    },

    staff: {
      type: "object",
      description: "Populated Staff information",
      properties: {
        _id: {
          type: "string",
          example: "686f6b8d2b45d12e85d88d1a"
        },

        name: {
          type: "string",
          example: "John Doe"
        },

        email: {
          type: "string",
          format: "email",
          example: "john@gmail.com"
        }
      }
    },

    specialization: {
      type: "string",
      example: "Neurologist"
    },

    licenseNum: {
      type: "string",
      example: "MDCN/12345"
    },

    yearsOfExperience: {
      type: "integer",
      minimum: 0,
      example: 12
    },

    consultingDay: {
      type: "string",
      example: "Monday - Friday"
    },

    clinicHours: {
      type: "string",
      example: "08:00 AM - 04:00 PM"
    },

    createdAt: {
      type: "string",
      format: "date-time",
      example: "2026-07-17T10:30:00.000Z"
    },

    updatedAt: {
      type: "string",
      format: "date-time",
      example: "2026-07-17T10:30:00.000Z"
    }
  }
},

CreateDoctorRequest: {
  type: "object",

  required: [
    "specialization",
    "licenseNum",
    "yearsOfExperience",
    "clinicHours"
  ],

  properties: {
    specialization: {
      type: "string",
      example: "Neurologist"
    },

    licenseNum: {
      type: "string",
      example: "MDCN/12345"
    },

    yearsOfExperience: {
      type: "integer",
      minimum: 0,
      example: 12
    },

    consultingDay: {
      type: "string",
      example: "Monday - Friday"
    },

    clinicHours: {
      type: "string",
      example: "08:00 AM - 04:00 PM"
    }
  }
},

UpdateDoctorRequest: {
  type: "object",

  properties: {
    specialization: {
      type: "string",
      example: "Neurosurgeon"
    },

    licenseNum: {
      type: "string",
      example: "MDCN/67890"
    },

    yearsOfExperience: {
      type: "integer",
      minimum: 0,
      example: 15
    },

    consultingDay: {
      type: "string",
      example: "Monday - Thursday"
    },

    clinicHours: {
      type: "string",
      example: "09:00 AM - 05:00 PM"
    }
  }
},

CreateDoctorResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Doctor data created successfully"
    },

    data: {
      $ref: "#/components/schemas/Doctor"
    }
  }
},

GetAllDoctorsResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "List of doctors"
    },

    data: {
      type: "object",

      properties: {
        currentPage: {
          type: "integer",
          example: 1
        },

        totalPages: {
          type: "integer",
          example: 5
        },

        limit: {
          type: "integer",
          example: 10
        },

        totalItems: {
          type: "integer",
          example: 48
        },

        hasNextPage: {
          type: "boolean",
          example: true
        },

        hasPreviousPage: {
          type: "boolean",
          example: false
        },

        nextPage: {
          type: "integer",
          nullable: true,
          example: 2
        },

        previousPage: {
          type: "integer",
          nullable: true,
          example: null
        },

        totalDoctors: {
          type: "integer",
          example: 48
        },

        doctors: {
          type: "array",

          items: {
            $ref: "#/components/schemas/Doctor"
          }
        }
      }
    }
  }
},

GetDoctorByIdResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Doctor found"
    },

    data: {
      $ref: "#/components/schemas/Doctor"
    }
  }
},

UpdateDoctorResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Doctor updated successfully"
    },

    data: {
      $ref: "#/components/schemas/Doctor"
    }
  }
},

DeleteDoctorResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Doctor deleted successfully"
    },

    data: {
      $ref: "#/components/schemas/Doctor"
    }
  }
},


Nurse: {
  type: "object",

  properties: {
    _id: {
      type: "string",
      example: "6872e4c685d4c93d8fdf4321"
    },

    staff: {
      type: "object",
      description: "Populated Staff information",
      properties: {
        _id: {
          type: "string",
          example: "686f6b8d2b45d12e85d88d1a"
        },

        name: {
          type: "string",
          example: "John Doe"
        },

        email: {
          type: "string",
          format: "email",
          example: "john@gmail.com"
        }
      }
    },

    certification: {
      type: "string",
      enum: ["RN", "LPN", "CNA", "BscN"],
      example: "RN"
    },

    wardAssigned: {
      type: "string",
      example: "ICU"
    },

    shift: {
      type: "string",
      enum: ["Morning", "Afternoon", "Night"],
      example: "Morning"
    },

    yearsOfExperience: {
      type: "integer",
      minimum: 0,
      example: 8
    },

    licenseNum: {
      type: "string",
      example: "NMCN/123456"
    },

    supervisor: {
      type: "string",
      example: "Dr. John Doe"
    },

    createdAt: {
      type: "string",
      format: "date-time",
      example: "2026-08-15T10:30:00.000Z"
    },

    updatedAt: {
      type: "string",
      format: "date-time",
      example: "2026-08-15T10:30:00.000Z"
    }
  }
},

Cleaner: {
  type: "object",

  properties: {
    _id: {
      type: "string",
      example: "68a1f5e8c4a123456789abcd"
    },

    staff: {
      type: "object",
      description: "Populated Staff information",
      properties: {
        _id: {
          type: "string",
          example: "686f6b8d2b45d12e85d88d1a"
        },

        name: {
          type: "string",
          example: "John Doe"
        },

        email: {
          type: "string",
          format: "email",
          example: "john@gmail.com"
        }
      }
    },

    areaAssigned: {
      type: "string",
      example: "Reception"
    },

    shift: {
      type: "string",
      enum: ["Morning", "Afternoon", "Night"],
      example: "Night"
    },

    supervisor: {
      type: "string",
      example: "Dr. John Doe"
    },

    workSchedule: {
      type: "string",
      example: "Monday - Friday, 8:00 AM - 4:00 PM"
    },

    createdAt: {
      type: "string",
      format: "date-time",
      example: "2026-08-15T10:30:00.000Z"
    },

    updatedAt: {
      type: "string",
      format: "date-time",
      example: "2026-08-15T10:30:00.000Z"
    }
  }
},

CreateCleanerRequest: {
  type: "object",

  required: [
    "areaAssigned",
    "shift",
    "supervisor",
    "workSchedule"
  ],

  properties: {
    areaAssigned: {
      type: "string",
      example: "Reception"
    },

    shift: {
      type: "string",
      enum: ["Morning", "Afternoon", "Night"],
      example: "Night"
    },

    supervisor: {
      type: "string",
      example: "Dr. John Doe"
    },

    workSchedule: {
      type: "string",
      example: "Monday - Friday, 8:00 AM - 4:00 PM"
    }
  }
},

UpdateCleanerRequest: {
  type: "object",

  properties: {
    areaAssigned: {
      type: "string",
      example: "Operating Theatre"
    },

    shift: {
      type: "string",
      enum: ["Morning", "Afternoon", "Night"],
      example: "Morning"
    },

    supervisor: {
      type: "string",
      example: "Dr. Jane Doe"
    },

    workSchedule: {
      type: "string",
      example: "Monday - Saturday, 7:00 AM - 3:00 PM"
    }
  }
},

CreateCleanerResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Cleaner data created successfully"
    },

    data: {
      $ref: "#/components/schemas/Cleaner"
    }
  }
},

GetAllCleanersResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "List of cleaners"
    },

    data: {
      type: "object",

      properties: {
        currentPage: {
          type: "integer",
          example: 1
        },

        totalPages: {
          type: "integer",
          example: 5
        },

        limit: {
          type: "integer",
          example: 10
        },

        totalItems: {
          type: "integer",
          example: 48
        },

        hasNextPage: {
          type: "boolean",
          example: true
        },

        hasPreviousPage: {
          type: "boolean",
          example: false
        },

        nextPage: {
          type: "integer",
          nullable: true,
          example: 2
        },

        previousPage: {
          type: "integer",
          nullable: true,
          example: null
        },

        totalCleaners: {
          type: "integer",
          example: 48
        },

        cleaners: {
          type: "array",

          items: {
            $ref: "#/components/schemas/Cleaner"
          }
        }
      }
    }
  }
},

GetCleanerResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Cleaner retrieved successfully"
    },

    data: {
      $ref: "#/components/schemas/Cleaner"
    }
  }
},

UpdateCleanerResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Cleaner updated successfully"
    },

    data: {
      $ref: "#/components/schemas/Cleaner"
    }
  }
},

DeleteCleanerResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Cleaner deleted successfully"
    },

    data: {
      $ref: "#/components/schemas/Cleaner"
    }
  }
},

Drug: {
  type: "object",

  properties: {
    _id: {
      type: "string",
      example: "68a1f5e8c4a123456789abcd"
    },

    genericName: {
      type: "string",
      example: "Citicoline"
    },

    therapeuticClass: {
      type: "string",
      example: "Neuroprotective Agent"
    },

    indications: {
      type: "array",
      items: {
        type: "string"
      },
      example: [
        "Acute ischemic stroke",
        "Cognitive impairment"
      ]
    },

    contraindications: {
      type: "array",
      items: {
        type: "string"
      },
      example: [
        "Hypersensitivity to Citicoline"
      ]
    },

    sideEffects: {
      type: "array",
      items: {
        type: "string"
      },
      example: [
        "Headache",
        "Nausea"
      ]
    },

    interactions: {
      type: "array",
      items: {
        type: "string"
      },
      example: [
        "Levodopa"
      ]
    },

    prescriptionRequired: {
      type: "boolean",
      example: true
    },

    route: {
      type: "string",
      example: "Intravenous"
    },

    brandName: {
      type: "string",
      example: "I.V. Citicoline"
    },

    manufacturer: {
      type: "string",
      example: "Samarth Life Sciences"
    },

    dosageForm: {
      type: "string",
      example: "Injection"
    },

    strength: {
      type: "string",
      example: "500 mg/4 mL"
    },

    nafdacNumber: {
      type: "string",
      example: "A4-9876"
    },

    costPrice: {
      type: "number",
      format: "double",
      minimum: 0,
      example: 3200
    },

    sellingPrice: {
      type: "number",
      format: "double",
      minimum: 0,
      example: 4500
    },

    minimumStockLevel: {
      type: "integer",
      minimum: 0,
      example: 20
    },

    isActive: {
      type: "boolean",
      example: true
    },

    createdAt: {
      type: "string",
      format: "date-time"
    },

    updatedAt: {
      type: "string",
      format: "date-time"
    }
  }
},

CreateDrugRequest: {
  type: "object",

  required: [
    "genericName",
    "therapeuticClass",
    "route",
    "brandName",
    "dosageForm",
    "strength",
    "nafdacNumber"
  ],

  properties: {
    genericName: {
      type: "string",
      example: "Citicoline"
    },

    therapeuticClass: {
      type: "string",
      example: "Neuroprotective Agent"
    },

    indications: {
      type: "array",
      items: {
        type: "string"
      },
      example: [
        "Acute ischemic stroke",
        "Cognitive impairment"
      ]
    },

    contraindications: {
      type: "array",
      items: {
        type: "string"
      },
      example: [
        "Hypersensitivity to Citicoline"
      ]
    },

    sideEffects: {
      type: "array",
      items: {
        type: "string"
      },
      example: [
        "Headache",
        "Nausea"
      ]
    },

    interactions: {
      type: "array",
      items: {
        type: "string"
      },
      example: [
        "Levodopa"
      ]
    },

    prescriptionRequired: {
      type: "boolean",
      default: true,
      example: true
    },

    route: {
      type: "string",
      example: "Intravenous"
    },

    brandName: {
      type: "string",
      example: "I.V. Citicoline"
    },

    manufacturer: {
      type: "string",
      example: "Samarth Life Sciences"
    },

    dosageForm: {
      type: "string",
      example: "Injection"
    },

    strength: {
      type: "string",
      example: "500 mg/4 mL"
    },

    nafdacNumber: {
      type: "string",
      example: "A4-9876"
    },

    costPrice: {
      type: "number",
      format: "double",
      minimum: 0,
      example: 3200
    },

    sellingPrice: {
      type: "number",
      format: "double",
      minimum: 0,
      example: 4500
    },

    minimumStockLevel: {
      type: "integer",
      minimum: 0,
      default: 10,
      example: 20
    },

    isActive: {
      type: "boolean",
      default: true,
      example: true
    }
  }
},

UpdateDrugRequest: {
  type: "object",

  properties: {
    genericName: {
      type: "string",
      example: "Citicoline"
    },

    therapeuticClass: {
      type: "string",
      example: "Neuroprotective Agent"
    },

    indications: {
      type: "array",
      items: {
        type: "string"
      },
      example: [
        "Acute ischemic stroke"
      ]
    },

    contraindications: {
      type: "array",
      items: {
        type: "string"
      },
      example: [
        "Hypersensitivity"
      ]
    },

    sideEffects: {
      type: "array",
      items: {
        type: "string"
      },
      example: [
        "Headache"
      ]
    },

    interactions: {
      type: "array",
      items: {
        type: "string"
      },
      example: [
        "Levodopa"
      ]
    },

    prescriptionRequired: {
      type: "boolean",
      example: true
    },

    route: {
      type: "string",
      example: "Intravenous"
    },

    brandName: {
      type: "string",
      example: "I.V. Citicoline"
    },

    manufacturer: {
      type: "string",
      example: "Samarth Life Sciences"
    },

    dosageForm: {
      type: "string",
      example: "Injection"
    },

    strength: {
      type: "string",
      example: "500 mg/4 mL"
    },

    nafdacNumber: {
      type: "string",
      example: "A4-9876"
    },

    costPrice: {
      type: "number",
      format: "double",
      minimum: 0,
      example: 3200
    },

    sellingPrice: {
      type: "number",
      format: "double",
      minimum: 0,
      example: 4500
    },

    minimumStockLevel: {
      type: "integer",
      minimum: 0,
      example: 20
    },

    isActive: {
      type: "boolean",
      example: true
    }
  }
},

CreateDrugResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Drug created successfully"
    },

    data: {
      $ref: "#/components/schemas/Drug"
    }
  }
},

GetDrugResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Drug retrieved successfully"
    },

    data: {
      $ref: "#/components/schemas/Drug"
    }
  }
},

GetAllDrugsResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "List of drugs retrieved successfully"
    },

    data: {
      type: "object",

      properties: {
        page: {
          type: "integer",
          example: 1
        },

        limit: {
          type: "integer",
          example: 10
        },

        totalDrugs: {
          type: "integer",
          example: 48
        },

        drugs: {
          type: "array",

          items: {
            $ref: "#/components/schemas/Drug"
          }
        }
      }
    }
  }
},

SearchDrugsResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Drugs retrieved successfully"
    },

    data: {
      type: "object",

      properties: {
        count: {
          type: "integer",
          example: 2
        },

        drugs: {
          type: "array",

          items: {
            $ref: "#/components/schemas/Drug"
          }
        }
      }
    }
  }
},

UpdateDrugResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Drug updated successfully"
    },

    data: {
      $ref: "#/components/schemas/Drug"
    }
  }
},

DeleteDrugResponse: {
  type: "object",

  properties: {
    success: {
      type: "boolean",
      example: true
    },

    message: {
      type: "string",
      example: "Drug deleted successfully"
    },

    data: {
      $ref: "#/components/schemas/Drug"
    }
  }
},


      }
    }
  },

  apis: ["./Routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;