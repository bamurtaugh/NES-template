# Cross-File Refactoring Demo: User Management App

This React TypeScript application demonstrates how **VS Code's Next Edit Suggestions (NES)** can help with cross-file refactoring scenarios. The app manages users with roles and demonstrates the most challenging aspect of refactoring: making changes that span multiple files.

## Project Structure

```
user-management-app/
├── src/
│   ├── components/
│   │   ├── App.tsx           # Main app component importing user utilities
│   │   ├── UserList.tsx      # List component using user formatting functions
│   │   └── UserForm.tsx      # Form component using user validation utilities
│   ├── services/
│   │   └── userService.ts    # API service with methods using User types
│   ├── types/
│   │   └── user.ts           # Type definitions for User and related interfaces
│   ├── utils/
│   │   └── userUtils.ts      # Utility functions for user data manipulation
│   ├── index.tsx             # Application entry point
│   └── styles.css            # Styling with user-related class names
├── package.json
└── README.md
```

## Cross-File Refactoring Scenarios

### 🔄 Scenario 1: Renaming Core Entity (User → Customer)

**Goal**: Rename "User" to "Customer" throughout the entire codebase.

**Files affected**: All files in the project (types, services, components, utilities)

**Steps to demonstrate NES**:

1. **Start with the type definition** in `src/types/user.ts`:
   - Line 4: Change `export interface User {` to `export interface Customer {`
   - NES should suggest updating all references to `User` type throughout the file

2. **Update type exports**:
   - Line 19: Change `UserFormData` to `CustomerFormData`
   - Line 26: Change `UserListFilter` to `CustomerListFilter`
   - NES should suggest updating imports in other files

3. **Observe cascading suggestions**:
   - NES should suggest updating `userService.ts` to use `Customer` instead of `User`
   - NES should suggest updating component imports and usage
   - NES should suggest updating utility function parameters and return types

**Expected NES behavior**:
- Automatically suggest import statement updates across all files
- Suggest parameter type updates in function signatures
- Suggest variable declaration updates
- Suggest method return type updates

### 🔄 Scenario 2: Renaming Service Methods

**Goal**: Rename `UserService` methods to follow a new naming convention.

**Start in** `src/services/userService.ts`:

1. **Line 30**: Change `getAllUsers` to `fetchAllUsers`
   - NES should suggest updating the import and usage in `App.tsx`

2. **Line 41**: Change `getUserById` to `fetchUserById`
   - NES should suggest updating any references throughout the codebase

3. **Line 51**: Change `createUser` to `addUser`
   - NES should suggest updating the call in `App.tsx`

**Expected NES behavior**:
- Suggest updating method calls in React components
- Suggest updating destructured imports
- Maintain consistency with async/await patterns

### 🔄 Scenario 3: Renaming Utility Functions

**Goal**: Rename utility functions to improve clarity.

**Start in** `src/utils/userUtils.ts`:

1. **Line 7**: Change `formatUserName` to `getDisplayName`
   - NES should suggest updating imports in `UserList.tsx`

2. **Line 12**: Change `getUserRoleDisplay` to `formatRole`
   - NES should suggest updating imports in both `UserList.tsx` and `UserForm.tsx`

3. **Line 21**: Change `isUserAdmin` to `hasAdminRole`
   - NES should suggest updating usage in `UserList.tsx`

**Expected NES behavior**:
- Update import statements with new function names
- Update function calls while preserving parameters
- Suggest related function renames for consistency

### 🔄 Scenario 4: Restructuring File Organization

**Goal**: Move user types to separate files and update imports.

**Steps**:

1. **Create new files**:
   - `src/types/userTypes.ts` (for core User interface)
   - `src/types/userEnums.ts` (for UserRole type)

2. **Move `User` interface** from `user.ts` to `userTypes.ts`
   - NES should suggest updating all imports that reference `User`

3. **Move `UserRole` type** to `userEnums.ts`
   - NES should suggest updating imports and adding new import statements

**Expected NES behavior**:
- Suggest adding new import statements for moved types
- Update existing import statements to remove moved types
- Maintain proper TypeScript import syntax

### 🔄 Scenario 5: Component Prop Renaming

**Goal**: Rename component props for better clarity.

**Start in** `src/components/UserList.tsx`:

1. **Line 13**: Change `users` prop to `userList`
   - NES should suggest updating the prop destructuring
   - NES should suggest updating usage throughout the component

2. **Line 16**: Change `onUserSelect` to `onUserEdit`
   - NES should suggest updating the prop type and usage
   - NES should suggest updating the parent component's prop passing

**Expected NES behavior**:
- Update prop interface definitions
- Update destructuring assignments
- Suggest updating parent component prop passing
- Maintain callback function signatures

## How to Test These Scenarios

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Open in VS Code** with NES enabled

3. **Try the refactoring scenarios** listed above:
   - Make the initial change suggested in each scenario
   - Watch for NES suggestions appearing in other files
   - Accept the suggestions to see cross-file refactoring in action

4. **Verify the app still works**:
   ```bash
   npm start
   ```

## Key NES Features Demonstrated

- **Cross-file type updates**: Changing TypeScript interfaces propagates through imports
- **Method signature updates**: Renaming functions updates all call sites
- **Import statement management**: Moving/renaming exports updates import statements
- **Component prop consistency**: Renaming props updates both definition and usage
- **Cascading refactoring**: One change triggers suggestions in multiple related files

## Benefits of NES for Cross-File Refactoring

1. **Reduces manual effort**: No need to manually find and replace across files
2. **Prevents errors**: Automatic updates reduce the risk of missed references
3. **Maintains consistency**: Ensures naming conventions are applied uniformly
4. **Saves time**: Dramatically faster than manual refactoring
5. **Improves confidence**: Less fear of breaking changes when refactoring large codebases

## Real-World Applications

This demo represents common refactoring scenarios in production applications:

- **API redesign**: Updating service method names and signatures
- **Domain model changes**: Renaming core business entities
- **Code organization**: Restructuring files and updating imports
- **Naming standardization**: Applying consistent naming conventions
- **Component evolution**: Updating component interfaces and props

The patterns shown here scale to much larger applications where manual refactoring would be prohibitively time-consuming and error-prone.