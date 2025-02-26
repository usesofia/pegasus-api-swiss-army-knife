"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildClerkClientMock = exports.TestUser = exports.TestOrganization = void 0;
const faker_1 = require("@faker-js/faker");
const luxon_1 = require("luxon");
const uuid_1 = require("uuid");
var TestOrganization;
(function (TestOrganization) {
    TestOrganization["AMBEV"] = "AMBEV";
    TestOrganization["EMBRAER"] = "EMBRAER";
    TestOrganization["VETTOR_BPO"] = "VETTOR_BPO";
    TestOrganization["RESERVA_STORE_42"] = "RESERVA_STORE_42";
    TestOrganization["CHILLIBEANS_STORE_312"] = "CHILLIBEANS_STORE_312";
    TestOrganization["NAGUMO_SUPERMERCADOS"] = "NAGUMO_SUPERMERCADOS";
    TestOrganization["NAGUMO_STORE_123"] = "NAGUMO_STORE_123";
    TestOrganization["NAGUMO_STORE_321"] = "NAGUMO_STORE_321";
})(TestOrganization || (exports.TestOrganization = TestOrganization = {}));
var TestUser;
(function (TestUser) {
    TestUser["JOAO"] = "JOAO";
    TestUser["JOANA"] = "JOANA";
    TestUser["JULIANA"] = "JULIANA";
    TestUser["MARIA"] = "MARIA";
    TestUser["LUCAS"] = "LUCAS";
    TestUser["RONALDO"] = "RONALDO";
    TestUser["RONY"] = "RONY";
    TestUser["CAITO"] = "CAITO";
    TestUser["DANIEL"] = "DANIEL";
    TestUser["RENATA"] = "RENATA";
    TestUser["FERNANDA"] = "FERNANDA";
})(TestUser || (exports.TestUser = TestUser = {}));
const memberUsers = [TestUser.JOANA];
const processToken = (token) => {
    const splitedToken = token.split(':');
    if (splitedToken.length === 1) {
        const user = TestUser[splitedToken[0]];
        return [user, undefined];
    }
    else if (splitedToken.length === 2) {
        const user = TestUser[splitedToken[0]];
        const organization = TestOrganization[splitedToken[1]];
        switch (organization) {
            case TestOrganization.AMBEV:
                if (user !== TestUser.JOAO &&
                    user !== TestUser.JOANA &&
                    user !== TestUser.JULIANA) {
                    throw new Error(`Invalid user ${user} for organization ${organization}.`);
                }
                break;
            case TestOrganization.EMBRAER:
                if (user !== TestUser.MARIA && user !== TestUser.JULIANA) {
                    throw new Error(`Invalid user ${user} for organization ${organization}.`);
                }
                break;
            case TestOrganization.VETTOR_BPO:
                if (user !== TestUser.LUCAS && user !== TestUser.RONALDO) {
                    throw new Error(`Invalid user ${user} for organization ${organization}.`);
                }
                break;
            case TestOrganization.RESERVA_STORE_42:
                if (user !== TestUser.RONY) {
                    throw new Error(`Invalid user ${user} for organization ${organization}.`);
                }
                break;
            case TestOrganization.CHILLIBEANS_STORE_312:
                if (user !== TestUser.CAITO) {
                    throw new Error(`Invalid user ${user} for organization ${organization}.`);
                }
                break;
            case TestOrganization.NAGUMO_SUPERMERCADOS:
                if (user !== TestUser.DANIEL && user !== TestUser.RONALDO) {
                    throw new Error(`Invalid user ${user} for organization ${organization}.`);
                }
                break;
            case TestOrganization.NAGUMO_STORE_123:
                if (user !== TestUser.RENATA) {
                    throw new Error(`Invalid user ${user} for organization ${organization}.`);
                }
                break;
            case TestOrganization.NAGUMO_STORE_321:
                if (user !== TestUser.FERNANDA) {
                    throw new Error(`Invalid user ${user} for organization ${organization}.`);
                }
                break;
            default:
                throw new Error(`Invalid organization ${String(organization)}.`);
        }
        return [user, organization];
    }
    else {
        throw new Error(`Invalid token ${token}.`);
    }
};
const buildClerkUser = ({ user }) => {
    const userId = (0, uuid_1.v4)();
    const emailAddresses = [
        {
            id: (0, uuid_1.v4)(),
            emailAddress: `${user.toString().toLowerCase()}-${userId}@example.com`,
            linkedTo: [],
            verification: null,
        },
    ];
    const phoneNumbers = [
        {
            id: (0, uuid_1.v4)(),
            phoneNumber: faker_1.faker.phone.number(),
            linkedTo: [],
            verification: null,
            reservedForSecondFactor: false,
            defaultSecondFactor: false,
        },
    ];
    const firstName = user.toString().charAt(0).toUpperCase() + user.toString().slice(1);
    const lastName = faker_1.faker.person.lastName();
    const clerkUser = {
        id: userId,
        passwordEnabled: true,
        totpEnabled: true,
        backupCodeEnabled: true,
        twoFactorEnabled: true,
        banned: false,
        locked: false,
        createdAt: 1713542400,
        updatedAt: 1713542400,
        imageUrl: 'https://example.com/image.png',
        hasImage: true,
        primaryEmailAddressId: emailAddresses[0].id,
        primaryPhoneNumberId: phoneNumbers[0].id,
        primaryWeb3WalletId: (0, uuid_1.v4)(),
        lastSignInAt: 1713542400,
        externalId: (0, uuid_1.v4)(),
        username: `${user.toString().toLowerCase()}-${userId}`,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        emailAddresses,
        phoneNumbers,
        web3Wallets: [],
        publicMetadata: {},
        privateMetadata: {},
        unsafeMetadata: {},
        externalAccounts: [],
        samlAccounts: [],
        lastActiveAt: 1713542400,
        createOrganizationEnabled: true,
        createOrganizationsLimit: null,
        deleteSelfEnabled: true,
        legalAcceptedAt: 1713542400,
        primaryEmailAddress: emailAddresses[0],
        primaryPhoneNumber: phoneNumbers[0],
        primaryWeb3Wallet: null,
    };
    return clerkUser;
};
const buildClerkOrganization = ({ organization, }) => {
    const organizationId = (0, uuid_1.v4)();
    const clerkOrganization = {
        id: organizationId,
        name: organization.toString().charAt(0).toUpperCase() +
            organization.toString().slice(1),
        slug: organization.toString().toLowerCase() + '-' + organizationId,
        imageUrl: 'https://example.com/image.png',
        hasImage: true,
        createdAt: 1713542400,
        updatedAt: 1713542400,
        publicMetadata: {},
        privateMetadata: {},
        maxAllowedMemberships: 100,
        adminDeleteEnabled: true,
    };
    return clerkOrganization;
};
const buildClerkOrganizationMembership = ({ clerkUser, clerkOrganization, role, }) => {
    const organizationMembership = {
        id: (0, uuid_1.v4)(),
        role,
        permissions: [],
        publicMetadata: {},
        privateMetadata: {},
        createdAt: luxon_1.DateTime.now().toMillis(),
        updatedAt: luxon_1.DateTime.now().toMillis(),
        organization: clerkOrganization,
        publicUserData: {
            identifier: clerkUser.primaryEmailAddress.emailAddress,
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
            imageUrl: clerkUser.imageUrl,
            hasImage: clerkUser.hasImage,
            userId: clerkUser.id,
        },
    };
    return organizationMembership;
};
const buildClerkClientMock = () => {
    const clerkUsers = {
        [TestUser.JOAO]: buildClerkUser({ user: TestUser.JOAO }),
        [TestUser.JOANA]: buildClerkUser({ user: TestUser.JOANA }),
        [TestUser.JULIANA]: buildClerkUser({ user: TestUser.JULIANA }),
        [TestUser.MARIA]: buildClerkUser({ user: TestUser.MARIA }),
        [TestUser.LUCAS]: buildClerkUser({ user: TestUser.LUCAS }),
        [TestUser.RONALDO]: buildClerkUser({ user: TestUser.RONALDO }),
        [TestUser.RONY]: buildClerkUser({ user: TestUser.RONY }),
        [TestUser.CAITO]: buildClerkUser({ user: TestUser.CAITO }),
        [TestUser.DANIEL]: buildClerkUser({ user: TestUser.DANIEL }),
        [TestUser.RENATA]: buildClerkUser({ user: TestUser.RENATA }),
        [TestUser.FERNANDA]: buildClerkUser({ user: TestUser.FERNANDA }),
    };
    const plainClerkOrganizations = {
        [TestOrganization.AMBEV]: buildClerkOrganization({
            organization: TestOrganization.AMBEV,
        }),
        [TestOrganization.EMBRAER]: buildClerkOrganization({
            organization: TestOrganization.EMBRAER,
        }),
        [TestOrganization.VETTOR_BPO]: buildClerkOrganization({
            organization: TestOrganization.VETTOR_BPO,
        }),
        [TestOrganization.RESERVA_STORE_42]: buildClerkOrganization({
            organization: TestOrganization.RESERVA_STORE_42,
        }),
        [TestOrganization.CHILLIBEANS_STORE_312]: buildClerkOrganization({
            organization: TestOrganization.CHILLIBEANS_STORE_312,
        }),
        [TestOrganization.NAGUMO_SUPERMERCADOS]: buildClerkOrganization({
            organization: TestOrganization.NAGUMO_SUPERMERCADOS,
        }),
        [TestOrganization.NAGUMO_STORE_123]: buildClerkOrganization({
            organization: TestOrganization.NAGUMO_STORE_123,
        }),
        [TestOrganization.NAGUMO_STORE_321]: buildClerkOrganization({
            organization: TestOrganization.NAGUMO_STORE_321,
        }),
    };
    const clerkOrganizations = {
        [TestOrganization.AMBEV]: {
            ...plainClerkOrganizations[TestOrganization.AMBEV],
            publicMetadata: {
                type: 'LEAF',
            },
        },
        [TestOrganization.EMBRAER]: {
            ...plainClerkOrganizations[TestOrganization.EMBRAER],
            publicMetadata: {
                type: 'LEAF',
            },
        },
        [TestOrganization.VETTOR_BPO]: {
            ...plainClerkOrganizations[TestOrganization.VETTOR_BPO],
            publicMetadata: {
                type: 'GROUP',
                children: [
                    plainClerkOrganizations[TestOrganization.RESERVA_STORE_42].id,
                    plainClerkOrganizations[TestOrganization.CHILLIBEANS_STORE_312].id,
                ],
                sharedContacts: false,
                sharedSubcategories: false,
                sharedTags: false,
            },
        },
        [TestOrganization.RESERVA_STORE_42]: {
            ...plainClerkOrganizations[TestOrganization.RESERVA_STORE_42],
            publicMetadata: {
                type: 'LEAF',
                parent: plainClerkOrganizations[TestOrganization.VETTOR_BPO].id,
            },
        },
        [TestOrganization.CHILLIBEANS_STORE_312]: {
            ...plainClerkOrganizations[TestOrganization.CHILLIBEANS_STORE_312],
            publicMetadata: {
                type: 'LEAF',
                parent: plainClerkOrganizations[TestOrganization.VETTOR_BPO].id,
            },
        },
        [TestOrganization.NAGUMO_SUPERMERCADOS]: {
            ...plainClerkOrganizations[TestOrganization.NAGUMO_SUPERMERCADOS],
            publicMetadata: {
                type: 'GROUP',
                children: [
                    plainClerkOrganizations[TestOrganization.NAGUMO_STORE_123].id,
                    plainClerkOrganizations[TestOrganization.NAGUMO_STORE_321].id,
                ],
                sharedContacts: true,
                sharedSubcategories: true,
                sharedTags: true,
            },
        },
        [TestOrganization.NAGUMO_STORE_123]: {
            ...plainClerkOrganizations[TestOrganization.NAGUMO_STORE_123],
            publicMetadata: {
                type: 'LEAF',
                parent: plainClerkOrganizations[TestOrganization.NAGUMO_SUPERMERCADOS].id,
            },
        },
        [TestOrganization.NAGUMO_STORE_321]: {
            ...plainClerkOrganizations[TestOrganization.NAGUMO_STORE_321],
            publicMetadata: {
                type: 'LEAF',
                parent: plainClerkOrganizations[TestOrganization.NAGUMO_SUPERMERCADOS].id,
            },
        },
    };
    const clerkMemberships = [
        buildClerkOrganizationMembership({
            clerkUser: clerkUsers[TestUser.JOAO],
            clerkOrganization: clerkOrganizations[TestOrganization.AMBEV],
            role: 'org:admin',
        }),
        buildClerkOrganizationMembership({
            clerkUser: clerkUsers[TestUser.JOANA],
            clerkOrganization: clerkOrganizations[TestOrganization.AMBEV],
            role: 'org:member',
        }),
        buildClerkOrganizationMembership({
            clerkUser: clerkUsers[TestUser.JULIANA],
            clerkOrganization: clerkOrganizations[TestOrganization.AMBEV],
            role: 'org:admin',
        }),
        buildClerkOrganizationMembership({
            clerkUser: clerkUsers[TestUser.MARIA],
            clerkOrganization: clerkOrganizations[TestOrganization.EMBRAER],
            role: 'org:admin',
        }),
        buildClerkOrganizationMembership({
            clerkUser: clerkUsers[TestUser.JULIANA],
            clerkOrganization: clerkOrganizations[TestOrganization.EMBRAER],
            role: 'org:admin',
        }),
        buildClerkOrganizationMembership({
            clerkUser: clerkUsers[TestUser.LUCAS],
            clerkOrganization: clerkOrganizations[TestOrganization.VETTOR_BPO],
            role: 'org:admin',
        }),
        buildClerkOrganizationMembership({
            clerkUser: clerkUsers[TestUser.RONALDO],
            clerkOrganization: clerkOrganizations[TestOrganization.VETTOR_BPO],
            role: 'org:admin',
        }),
        buildClerkOrganizationMembership({
            clerkUser: clerkUsers[TestUser.RONY],
            clerkOrganization: clerkOrganizations[TestOrganization.RESERVA_STORE_42],
            role: 'org:admin',
        }),
        buildClerkOrganizationMembership({
            clerkUser: clerkUsers[TestUser.CAITO],
            clerkOrganization: clerkOrganizations[TestOrganization.CHILLIBEANS_STORE_312],
            role: 'org:admin',
        }),
        buildClerkOrganizationMembership({
            clerkUser: clerkUsers[TestUser.DANIEL],
            clerkOrganization: clerkOrganizations[TestOrganization.NAGUMO_SUPERMERCADOS],
            role: 'org:admin',
        }),
        buildClerkOrganizationMembership({
            clerkUser: clerkUsers[TestUser.RONALDO],
            clerkOrganization: clerkOrganizations[TestOrganization.NAGUMO_SUPERMERCADOS],
            role: 'org:admin',
        }),
        buildClerkOrganizationMembership({
            clerkUser: clerkUsers[TestUser.RENATA],
            clerkOrganization: clerkOrganizations[TestOrganization.NAGUMO_STORE_123],
            role: 'org:admin',
        }),
        buildClerkOrganizationMembership({
            clerkUser: clerkUsers[TestUser.FERNANDA],
            clerkOrganization: clerkOrganizations[TestOrganization.NAGUMO_STORE_321],
            role: 'org:admin',
        }),
    ];
    const clerkInvitesByOrganization = {};
    return {
        _clerkUsers: clerkUsers,
        _clerkOrganizations: clerkOrganizations,
        _clerkMemberships: clerkMemberships,
        _clerkInvitesByOrganization: clerkInvitesByOrganization,
        verifyToken: jest.fn().mockImplementation((token) => {
            const [user, organization] = processToken(token);
            if (organization) {
                const clerkUser = clerkUsers[user];
                const clerkOrganization = clerkOrganizations[organization];
                return {
                    sub: clerkUser.id,
                    org_id: clerkOrganization.id,
                    org_role: memberUsers.includes(user) ? 'org:member' : 'org:admin',
                };
            }
            else {
                const clerkUser = clerkUsers[user];
                return {
                    sub: clerkUser.id,
                    org_id: undefined,
                    org_role: undefined,
                };
            }
        }),
        users: {
            getUser: jest.fn().mockImplementation((userId) => {
                return Object.values(clerkUsers).find((user) => user.id === userId);
            }),
        },
        organizations: {
            getOrganization: jest
                .fn()
                .mockImplementation(({ organizationId }) => {
                return Object.values(clerkOrganizations).find((organization) => organization.id === organizationId);
            }),
            createOrganizationInvitation: jest.fn().mockImplementation(({ organizationId, emailAddress, role, publicMetadata, }) => {
                const invite = {
                    id: (0, uuid_1.v4)(),
                    emailAddress,
                    role,
                    organizationId,
                    createdAt: luxon_1.DateTime.now().toMillis(),
                    updatedAt: luxon_1.DateTime.now().toMillis(),
                    status: 'pending',
                    publicMetadata: publicMetadata || {},
                    privateMetadata: {},
                };
                if (!clerkInvitesByOrganization[organizationId]) {
                    clerkInvitesByOrganization[organizationId] = [];
                }
                if (clerkInvitesByOrganization[organizationId].find((invite) => invite.emailAddress === emailAddress)) {
                    throw new Error(`Already invited ${emailAddress} to ${organizationId}.`);
                }
                clerkInvitesByOrganization[organizationId].push(invite);
                return invite;
            }),
            getOrganizationMembershipList: jest.fn().mockImplementation(({ organizationId, limit = 100, offset = 0, }) => {
                const memberships = clerkMemberships.filter((membership) => membership.organization.id === organizationId);
                const paginatedMemberships = memberships.slice(offset, offset + limit);
                return {
                    data: paginatedMemberships,
                    totalCount: memberships.length,
                };
            }),
            getOrganizationInvitationList: jest.fn().mockImplementation(({ organizationId, limit = 100, offset = 0, }) => {
                const invitations = clerkInvitesByOrganization[organizationId] ?? [];
                const paginatedInvitations = invitations.slice(offset, offset + limit);
                return {
                    data: paginatedInvitations,
                    totalCount: invitations.length,
                };
            }),
        },
    };
};
exports.buildClerkClientMock = buildClerkClientMock;
//# sourceMappingURL=clerk.utils.js.map