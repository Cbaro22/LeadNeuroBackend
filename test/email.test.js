import { jest } from "@jest/globals";


const mockSendMail = jest.fn();
const mockVerify = jest.fn();

jest.unstable_mockModule("nodemailer", () => ({
    default: {
        createTransport: jest.fn(() => ({
            sendMail: mockSendMail,
            verify: mockVerify,
        })),
    },
}));

const {
    registerationEmail,
    loginEmail,
    forgotPasswordEmail,
    resetPasswordEmail,
    deleteAccountEmail,
} = await import("../Services/emailServices.js");

beforeEach(() => {
    jest.clearAllMocks();
});

describe("Registration Email", () => {

    test("should return immediately in test environment", async () => {

        process.env.NODE_ENV = "test";

        await registerationEmail("john@test.com");

        expect(mockSendMail).not.toHaveBeenCalled();

    });

    test("should send registration email", async () => {

    process.env.NODE_ENV = "development";

    mockSendMail.mockResolvedValueOnce({});

    await registerationEmail("john@test.com");

    expect(mockSendMail).toHaveBeenCalledTimes(1);

    expect(mockSendMail).toHaveBeenCalledWith({
        from: process.env.EMAIL_USER,
        to: "john@test.com",
        subject: "Welcome to our platform",
        html: "<h1>Welcome to our platform. You have successfully registered!</h1>",
    });

});

test("should handle registration email errors", async () => {

    process.env.NODE_ENV = "development";

    const error = new Error("SMTP failed");

    mockSendMail.mockRejectedValueOnce(error);

    const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

    await registerationEmail("john@test.com");

    expect(consoleSpy).toHaveBeenCalledWith(
        "Error sending registration email:",
        error
    );

    consoleSpy.mockRestore();

});

});

describe("Login Email", () => {

    test("should return immediately in test environment", async () => {

        process.env.NODE_ENV = "test";

        await loginEmail("john@test.com");

        expect(mockSendMail).not.toHaveBeenCalled();

    });

        test("should send login email", async () => {

        process.env.NODE_ENV = "development";

        mockSendMail.mockResolvedValueOnce({});

        await loginEmail("john@test.com");

        expect(mockSendMail).toHaveBeenCalledWith({
            from: process.env.EMAIL,
            to: "john@test.com",
            subject: "Login Notification",
            html: "<h1>You have successfully logged in to your account!</h1>",
        });

    });

        test("should handle login email errors", async () => {

        process.env.NODE_ENV = "development";

        const error = new Error("SMTP failed");

        mockSendMail.mockRejectedValueOnce(error);

        const consoleSpy = jest
            .spyOn(console, "error")
            .mockImplementation(() => {});

        await loginEmail("john@test.com");

        expect(consoleSpy).toHaveBeenCalledWith(
            "Error sending login email:",
            error
        );

        consoleSpy.mockRestore();

    });

});
    
describe("Forgot Password Email", () => {

    test("should return immediately in test environment", async () => {

        process.env.NODE_ENV = "test";

        await forgotPasswordEmail("john@test.com", "reset-token");

        expect(mockSendMail).not.toHaveBeenCalled();

    });

    test("should send forgot password email", async () => {

        process.env.NODE_ENV = "development";

        mockSendMail.mockResolvedValueOnce({});

        await forgotPasswordEmail("john@test.com", "reset-token");

        expect(mockSendMail).toHaveBeenCalledWith({
            from: process.env.EMAIL,
            to: "john@test.com",
            subject: "Password Reset Request",
            html: `<h1>You have requested to reset your password. Please click the link below to reset your password:</h1><p><a href="http://yourdomain.com/reset-password/reset-token">Reset Password</a></p>`
        });

    });

});

describe("Reset Password Email", () => {

    test("should return immediately in test environment", async () => {

        process.env.NODE_ENV = "test";

        await resetPasswordEmail("john@test.com");

        expect(mockSendMail).not.toHaveBeenCalled();

    });

    test("should send reset password email", async () => {

        process.env.NODE_ENV = "development";

        mockSendMail.mockResolvedValueOnce({});

        await resetPasswordEmail("john@test.com");

        expect(mockSendMail).toHaveBeenCalledWith({
            from: process.env.EMAIL,
            to: "john@test.com",
            subject: "Password Reset Successful",
            html: "<h1>Your password has been reset successfully!</h1>"
        });

    });

    test("should handle reset password email errors", async () => {

        process.env.NODE_ENV = "development";

        const error = new Error("SMTP failed");

        mockSendMail.mockRejectedValueOnce(error);

        const consoleSpy = jest
            .spyOn(console, "error")
            .mockImplementation(() => {});

        await resetPasswordEmail("john@test.com");

        expect(consoleSpy).toHaveBeenCalledWith(
            "Error sending reset password email:",
            error
        );

        consoleSpy.mockRestore();

    });

});

describe("Delete Account Email", () => {

    test("should return immediately in test environment", async () => {

        process.env.NODE_ENV = "test";

        await deleteAccountEmail("john@test.com");

        expect(mockSendMail).not.toHaveBeenCalled();

    });

    test("should send delete account email", async () => {

        process.env.NODE_ENV = "development";

        mockSendMail.mockResolvedValueOnce({});

        await deleteAccountEmail("john@test.com");

        expect(mockSendMail).toHaveBeenCalledWith({
            from: process.env.EMAIL,
            to: "john@test.com",
            subject: "Account Deletion Confirmation",
            html: "<h1>Your account has been deleted.</h1>"
        });

    });

});
