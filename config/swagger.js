import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Lead Neuro Backend API",
      version: "1.0.0",
      description:
        "REST API documentation for the Lead Neuro Backend Management System.",
      contact: {
        name: "Lead Neuro Backend Team"
      }
    },

    servers: [
      {
        url: "http://localhost:4000",
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
  required: ["email", "password"],

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
    message: {
      type: "string",
      example: "Login successful"
    },

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
},

ForgotPasswordResponse: {
  type: "object",

  properties: {
    message: {
      type: "string",
      example: "Password reset email sent"
    },

    resetToken: {
      type: "string",
      example: "d1f9b8c4e7f54b2..."
    }
  }
},

ForgotPasswordRequest: {
  type: "object",

  required: ["email"],

  properties: {
    email: {
      type: "string",
      format: "email",
      example: "john@gmail.com"
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

Staff: {
  type: "object",

  properties: {
    _id: {
      type: "string",
      example: "686f6b8d2b45d12e85d88d1a"
    },

    staffId: {
      type: "string",
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
      enum: ["admin", "doctor", "nurse", "cleaner"],
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
    }
  }
},

CreateStaffResponse: {
  type: "object",

  properties: {
    message: {
      type: "string",
      example: "Staff created successfully"
    },

    staff: {
      $ref: "#/components/schemas/CreateStaffResponse"
    },

    roleData: {
      type: "object",
      description: "Contains Doctor, Nurse or Cleaner data depending on the registered staff role."
    },

    AccessToken: {
      type: "string",
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },

    RefreshToken: {
      type: "string",
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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
      enum: ["admin", "doctor", "nurse", "cleaner"],
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

UpdateStaffRequest: {
  type: "object",

  properties: {
    name: {
      type: "string",
      example: "John Doe"
    },

    phone: {
      type: "string",
      example: "08012345678"
    },

    Address: {
      type: "string",
      example: "Port Harcourt"
    },

    department: {
      type: "string",
      example: "Neurology"
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
    message: {
      type: "string",
      example: "Staff retrieved successfully"
    },

    staff: {
      type: "array",

      items: {
        $ref: "#/components/schemas/Staff"
      }
    }
  }
},

GetStaffByIdResponse: {
  type: "object",

  properties: {
    staff: {
      $ref: "#/components/schemas/Staff"
    },

    roleData: {
      type: "object",
      description: "Doctor, Nurse or Cleaner details depending on the staff role."
    }
  }
},

UpdateStaffResponse: {
  type: "object",

  properties: {
    message: {
      type: "string",
      example: "Staff updated successfully"
    },

    updatedStaff: {
      $ref: "#/components/schemas/Staff"
    }
  }
},

SuccessResponse: {
  type: "object",

  properties: {
    message: {
      type: "string",
      example: "Operation completed successfully."
    }
  }
},

DeleteResponse: {
  type: "object",

  properties: {
    message: {
      type: "string",
      example: "Record deleted successfully."
    }
  }
},

ErrorResponse: {
  type: "object",

  properties: {
    message: {
      type: "string",
      example: "Something went wrong."
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
      type: "string",
      description: "Reference to the Staff document",
      example: "686f6b8d2b45d12e85d88d1a"
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
      example: 12
    },

    clinicHours: {
      type: "string",
      example: "08:00 AM - 04:00 PM"
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
      example: 12
    },

    clinicHours: {
      type: "string",
      example: "08:00 AM - 04:00 PM"
    }
  }
},

CreateDoctorResponse: {
  type: "object",

  properties: {
    message: {
      type: "string",
      example: "Doctor data created successfully"
    },

    doctor: {
      $ref: "#/components/schemas/Doctor"
    }
  }
},

GetAllDoctorsResponse: {
  type: "object",

  properties: {
    message: {
      type: "string",
      example: "List of Doctors"
    },

    doctors: {
      type: "array",

      items: {
        $ref: "#/components/schemas/Doctor"
      }
    }
  }
},

GetDoctorByIdResponse: {
  type: "object",

  properties: {
    doctor: {
      $ref: "#/components/schemas/Doctor"
    }
  }
},

UpdateDoctorResponse: {
  type: "object",

  properties: {
    message: {
      type: "string",
      example: "Doctor updated successfully"
    },

    updatedDoctor: {
      $ref: "#/components/schemas/Doctor"
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
      example: 15
    },

    clinicHours: {
      type: "string",
      example: "09:00 AM - 05:00 PM"
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
      type: "string",
      description: "Reference to the Staff document",
      example: "686f6b8d2b45d12e85d88d1a"
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
    }
  }
},

CreateNurseResponse: {
  type: "object",

  properties: {
    message: {
      type: "string",
      example: "Nurse data created successfully"
    },

    nurse: {
      $ref: "#/components/schemas/Nurse"
    }
  }
},

GetAllNursesResponse: {
  type: "object",

  properties: {
    Message: {
      type: "string",
      example: "List of nurses"
    },

    nurses: {
      type: "array",

      items: {
        $ref: "#/components/schemas/Nurse"
      }
    }
  }
},

GetNurseResponse: {
  type: "object",

  properties: {
    message: {
      type: "string",
      example: "Nurse retrieved successfully"
    },

    nurse: {
      $ref: "#/components/schemas/Nurse"
    }
  }
},

UpdateNurseResponse: {
  type: "object",

  properties: {
    message: {
      type: "string",
      example: "Nurse updated successfully"
    },

    nurse: {
      $ref: "#/components/schemas/Nurse"
    }
  }
},

DeleteNurseResponse: {
  type: "object",

  properties: {
    message: {
      type: "string",
      example: "Nurse deleted successfully"
    },

    deletedNurse: {
      $ref: "#/components/schemas/Nurse"
    }
  }
},

CreateNurseRequest: {
  type: "object",

  required: [
    "certification",
    "wardAssigned",
    "shift"
  ],

  properties: {
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
    }
  }
},

UpdateNurseRequest: {
  type: "object",

  properties: {
    certification: {
      type: "string",
      enum: ["RN", "LPN", "CNA", "BscN"]
    },

    wardAssigned: {
      type: "string",
      example: "Emergency Ward"
    },

    shift: {
      type: "string",
      enum: ["Morning", "Afternoon", "Night"]
    }
  }
},

Cleaner: {
  type: "object",

  properties: {
    _id: {
      type: "string"
    },

    staff: {
      type: "string",
      description: "Reference to the Staff document",
      example: "686f6b8d2b45d12e85d88d1a"
    },

    assignedArea: {
      type: "string",
      example: "Reception"
    },

    shift: {
      type: "string",
      enum: ["Morning", "Afternoon", "Night"],
      example: "Night"
    }
  }
},

CreateCleanerResponse: {
  type: "object",

  properties: {
    message: {
      type: "string",
      example: "Cleaner data created successfully"
    },

    cleaner: {
      $ref: "#/components/schemas/Cleaner"
    }
  }
},

GetAllCleanersResponse: {
  type: "object",

  properties: {
    message: {
      type: "string",
      example: "List of cleaners"
    },

    cleaners: {
      type: "array",

      items: {
        $ref: "#/components/schemas/Cleaner"
      }
    }
  }
},

GetCleanerResponse: {
  type: "object",

  properties: {
    message: {
      type: "string",
      example: "Cleaner retrieved successfully"
    },

    cleaner: {
      $ref: "#/components/schemas/Cleaner"
    }
  }
},

UpdateCleanerResponse: {
  type: "object",

  properties: {

    message: {
      type: "string",
      example: "Cleaner updated successfully"
    },

    updatedCleaner: {
      $ref: "#/components/schemas/Cleaner"
    }

  }
},

DeleteCleanerResponse: {
  type: "object",

  properties: {

    message: {
      type: "string",
      example: "Cleaner deleted successfully"
    },

    deletedCleaner: {
      $ref: "#/components/schemas/Cleaner"
    }

  }
},

CreateCleanerRequest: {
  type: "object",

  required: [
    "assignedArea",
    "shift"
  ],

  properties: {
    assignedArea: {
      type: "string",
      example: "Reception"
    },

    shift: {
      type: "string",
      enum: ["Morning", "Afternoon", "Night"],
      example: "Night"
    }
  }
},

UpdateCleanerRequest: {
  type: "object",

  properties: {
    assignedArea: {
      type: "string",
      example: "Operating Theatre"
    },

    shift: {
      type: "string",
      enum: ["Morning", "Afternoon", "Night"]
    }
  }
},

Drug: {
  type: "object",

  properties: {
    _id: {
      type: "string"
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
      type: "string",
      example: "Acute ischemic stroke"
    },

    contraindications: {
      type: "string",
      example: "Hypersensitivity to Citicoline"
    },

    sideEffects: {
      type: "string",
      example: "Headache, nausea"
    },

    interactions: {
      type: "string",
      example: "Levodopa"
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
      example: 3200
    },

    sellingPrice: {
      type: "number",
      example: 4500
    },

    minimumStockLevel: {
      type: "number",
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

    message: {
      type: "string",
      example: "Drug created successfully"
    },

    drug: {
      $ref: "#/components/schemas/Drug"
    }

  }
},

GetAllDrugsResponse: {
  type: "object",

  properties: {

    message: {
      type: "string",
      example: "List of drugs retrieved successfully"
    },

    drugs: {
      type: "array",

      items: {
        $ref: "#/components/schemas/Drug"
      }
    }

  }
},

GetDrugResponse: {
  type: "object",

  properties: {

    message: {
      type: "string",
      example: "Drug retrieved successfully"
    },

    drug: {
      $ref: "#/components/schemas/Drug"
    }

  }
},

UpdateDrugResponse: {
  type: "object",

  properties: {

    message: {
      type: "string",
      example: "Drug updated successfully"
    },

    drug: {
      $ref: "#/components/schemas/Drug"
    }

  }
},

DeleteDrugResponse: {
  type: "object",

  properties: {

    message: {
      type: "string",
      example: "Drug deleted successfully"
    },

    drug: {
      $ref: "#/components/schemas/Drug"
    }

  }
},

SearchDrugsResponse: {
  type: "object",

  properties: {

    message: {
      type: "string",
      example: "Drugs retrieved successfully"
    },

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
},

CreateDrugRequest: {
  type: "object",

  required: [
    "genericName",
    "therapeuticClass",
    "indications",
    "contraindications",
    "sideEffects",
    "interactions",
    "route",
    "brandName",
    "manufacturer",
    "dosageForm",
    "strength",
    "nafdacNumber",
    "costPrice",
    "sellingPrice",
    "minimumStockLevel"
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
      type: "string",
      example: "Acute ischemic stroke"
    },

    contraindications: {
      type: "string",
      example: "Hypersensitivity"
    },

    sideEffects: {
      type: "string",
      example: "Headache"
    },

    interactions: {
      type: "string",
      example: "Levodopa"
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
      example: 3200
    },

    sellingPrice: {
      type: "number",
      example: 4500
    },

    minimumStockLevel: {
      type: "number",
      example: 20
    },

    isActive: {
      type: "boolean",
      example: true
    }
  }
},

UpdateDrugRequest: {
  type: "object",

  properties: {
    genericName: {
      type: "string"
    },

    therapeuticClass: {
      type: "string"
    },

    indications: {
      type: "string"
    },

    contraindications: {
      type: "string"
    },

    sideEffects: {
      type: "string"
    },

    interactions: {
      type: "string"
    },

    route: {
      type: "string"
    },

    brandName: {
      type: "string"
    },

    manufacturer: {
      type: "string"
    },

    dosageForm: {
      type: "string"
    },

    strength: {
      type: "string"
    },

    nafdacNumber: {
      type: "string"
    },

    costPrice: {
      type: "number"
    },

    sellingPrice: {
      type: "number"
    },

    minimumStockLevel: {
      type: "number"
    },

    isActive: {
      type: "boolean"
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