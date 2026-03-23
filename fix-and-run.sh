#!/usr/bin/env bash
set -e

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Rezz Hotel — Install & Dev Server"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 1: Fix npm cache permission issue
echo "→ Fixing npm cache permissions..."
sudo chown -R $(whoami) ~/.npm
echo "  Done."
echo ""

# Step 2: Clean any partial install
echo "→ Removing any partial node_modules..."
rm -rf node_modules package-lock.json
echo "  Done."
echo ""

# Step 3: Fresh install
echo "→ Running npm install..."
npm install
echo "  Done."
echo ""

# Step 4: Start dev server
echo "→ Starting dev server at http://localhost:3000"
echo ""
npm run dev
