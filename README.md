# Campus Canteen Hub

You are an expert full-stack web developer and UI/UX designer.

Build a complete, modern, responsive Canteen Management System website for a college canteen.

PROJECT NAME:

SmartCanteen – College Canteen Management System

GOAL:

Create a professional website where students can browse the canteen menu, order food, track orders, and make payments, while canteen staff can manage orders, food items, inventory, and sales.

TARGET USERS:

1. Students

2. Canteen Staff/Admin

TECH STACK:

- React

- TypeScript

- Tailwind CSS

- Modern component-based architecture

- Use clean reusable components

- Use local/mock data initially

- Structure the project so a real backend/database can be connected later

DESIGN:

- Modern college-tech startup style

- Clean and minimal UI

- Mobile-first responsive design

- Attractive food cards

- Smooth animations and hover effects

- Rounded cards and buttons

- Good spacing and typography

- Use a professional green/orange food-themed color palette

- Include light and dark mode if practical

- Do NOT make it look like a generic template

- Make it feel like a real production-ready college canteen application

STUDENT FEATURES:

1. STUDENT LOGIN / SIGNUP

- Student name

- Email

- Password

- College ID / Roll Number

- Login and signup screens

- Simple validation

2. STUDENT DASHBOARD

Show:

- Welcome message

- Current canteen status: Open/Closed

- Search food

- Food categories

- Popular items

- Today's special

- Current order status

- Cart summary

3. MENU

Create food categories:

- Breakfast

- Snacks

- Main Course

- Beverages

- Fast Food

- Healthy Food

Each food card should contain:

- Food image

- Food name

- Short description

- Price

- Vegetarian/non-vegetarian indicator

- Availability

- Rating

- Add to Cart button

- Quantity controls

4. SEARCH AND FILTER

Allow students to:

- Search food

- Filter by category

- Filter by price

- Filter vegetarian items

- Sort by price/rating/popularity

5. FOOD DETAILS

When a student clicks an item, show:

- Large food image

- Name

- Description

- Ingredients

- Price

- Availability

- Rating

- Quantity selector

- Add to cart

6. CART

Show:

- Selected items

- Quantity

- Individual prices

- Subtotal

- Taxes if applicable

- Total amount

- Remove item

- Increase/decrease quantity

- Clear cart

- Proceed to checkout

7. CHECKOUT

Show:

- Order summary

- Student information

- Pickup option

- Estimated preparation time

- Payment options:

  - UPI

  - Cash at Counter

  - Mock Online Payment

- Place Order button

For the demo, online payment should be simulated rather than using a real payment gateway.

8. ORDER TRACKING

After placing an order, show a visual timeline:

Order Placed

      ↓

Order Accepted

      ↓

Preparing

      ↓

Ready for Pickup

      ↓

Completed

Show:

- Order number

- Items

- Total amount

- Estimated preparation time

- Current status

9. ORDER HISTORY

Students should be able to view:

- Previous orders

- Order date

- Items

- Amount

- Status

- Reorder button

10. STUDENT PROFILE

Include:

- Name

- Roll number

- Email

- Phone number

- Profile photo

- Order history

- Account settings

ADMIN/CANTEEN STAFF FEATURES:

Create a separate admin dashboard.

1. ADMIN DASHBOARD

Show statistics:

- Today's orders

- Pending orders

- Completed orders

- Today's sales

- Total customers

- Low-stock items

Include charts for:

- Daily sales

- Orders by category

- Popular food items

2. ORDER MANAGEMENT

Admin can see all orders.

Each order should show:

- Order ID

- Student name

- Items

- Quantity

- Total

- Payment status

- Order status

- Order time

Admin can update status:

Pending → Accepted → Preparing → Ready → Completed

3. MENU MANAGEMENT

Admin can:

- Add food item

- Edit food item

- Delete food item

- Change price

- Change availability

- Upload/change food image

- Assign category

4. INVENTORY MANAGEMENT

Show:

- Ingredient/item name

- Current stock

- Minimum stock level

- Unit

- Status

Statuses:

- In Stock

- Low Stock

- Out of Stock

Include low-stock alerts.

5. SALES MANAGEMENT

Show:

- Today's sales

- Weekly sales

- Monthly sales

- Number of orders

- Average order value

- Best-selling items

6. ANNOUNCEMENTS

Admin can create announcements such as:

- Canteen closed today

- New food available

- Today's special

- Discount announcement

7. USER MANAGEMENT

Admin can view:

- Students

- Staff

- Basic account information

- Account status

IMPORTANT UI FEATURES:

Create a sidebar for the admin dashboard.

Student navigation should include:

Home

Menu

Cart

My Orders

Profile

Admin navigation should include:

Dashboard

Orders

Menu

Inventory

Sales

Users

Announcements

Settings

ADD DEMO DATA:

Create realistic sample data for:

- At least 15 food items

- Different categories

- 8–10 sample orders

- Inventory items

- Sales statistics

IMPORTANT FUNCTIONALITY:

- Navigation must actually work

- Buttons should perform meaningful actions

- Cart should update dynamically

- Quantity should update totals

- Placing an order should create an order

- Order status should update

- Admin changes to food availability should reflect in the student menu

- Search and filters should work

- Forms should have validation

- Show success/error notifications

- Use loading states where appropriate

- Use empty states when there is no data

DATABASE-READY STRUCTURE:

Even if using mock/local data initially, organize the code so it can later connect to Supabase or another backend.

Suggested entities:

Users

FoodItems

Categories

Orders

OrderItems

Inventory

Payments

Announcements

SECURITY:

- Separate student and admin access

- Do not expose admin pages to students

- Do not hardcode real passwords or payment credentials

- Use mock authentication for the demo

RESPONSIVE DESIGN:

The website must work properly on:

- Desktop

- Laptop

- Tablet

- Mobile

SPECIAL FEATURE:

Add a "Quick Order" section where students can reorder their previous favorite items with one click.

Also add:

- Estimated preparation time

- Vegetarian badges

- "Popular" badges

- "Low Stock" indicator where appropriate

- Canteen Open/Closed indicator

- Notification system

LANDING PAGE:

Create an attractive landing page before login.

Hero section:

"Skip the Queue. Order Smart."

"Your college canteen, right at your fingertips."

Buttons:

"Order Now"

"View Menu"

Include sections:

- How it works

- Popular foods

- Benefits

- Quick ordering

- Order tracking

- Footer

The final website should feel like a real startup-quality college canteen platform rather than a basic college project.

IMPORTANT:

Do not only create static screens. Implement the core interactions and navigation.

Start by creating the complete frontend with realistic mock data and working interactions. Keep the code clean, modular, and easy for a beginner developer to understand and modify.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6ce04320-7d32-50a0-bc40-d0f1a1dabd47).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
