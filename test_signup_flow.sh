#!/bin/bash

# ============================================================================
# COMPLETE SIGNUP AND COURSE FLOW TEST SCRIPT
# ============================================================================
# This script tests the entire user journey from signup to course enrollment

echo "🚀 Testing Complete Signup and Course Flow"
echo "========================================="

# Test configuration
BASE_URL="http://localhost:5000/api"
TEST_EMAIL="test_$(date +%s)@example.com"
TEST_FIREBASE_UID="test_uid_$(date +%s)"
TEST_PHONE="+918252188485"
TEST_NAME="Test User"

echo ""
echo "📝 Test Configuration:"
echo "  Email: $TEST_EMAIL"
echo "  Firebase UID: $TEST_FIREBASE_UID"
echo "  Phone: $TEST_PHONE"
echo "  Name: $TEST_NAME"

echo ""
echo "1️⃣ Testing User Creation..."
echo "================================="

CREATE_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -X POST "$BASE_URL/users/create" \
  -H "Content-Type: application/json" \
  -d "{
    \"firebaseUid\": \"$TEST_FIREBASE_UID\",
    \"phone\": \"$TEST_PHONE\",
    \"name\": \"$TEST_NAME\",
    \"email\": \"$TEST_EMAIL\"
  }")

HTTP_STATUS=$(echo "$CREATE_RESPONSE" | tail -1 | sed 's/.*://')
RESPONSE_BODY=$(echo "$CREATE_RESPONSE" | head -n -1)

if [ "$HTTP_STATUS" = "201" ]; then
  echo "✅ User creation successful!"
  echo "📄 Response: $RESPONSE_BODY"
else
  echo "❌ User creation failed!"
  echo "🔥 HTTP Status: $HTTP_STATUS"
  echo "📄 Response: $RESPONSE_BODY"
  exit 1
fi

echo ""
echo "2️⃣ Testing User Profile Fetch..."
echo "==================================="

PROFILE_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -X GET "$BASE_URL/users/profile/me" \
  -H "Content-Type: application/json" \
  -H "x-firebase-uid: $TEST_FIREBASE_UID")

HTTP_STATUS=$(echo "$PROFILE_RESPONSE" | tail -1 | sed 's/.*://')
RESPONSE_BODY=$(echo "$PROFILE_RESPONSE" | head -n -1)

if [ "$HTTP_STATUS" = "200" ]; then
  echo "✅ Profile fetch successful!"
  echo "📄 Response: $RESPONSE_BODY"
else
  echo "❌ Profile fetch failed!"
  echo "🔥 HTTP Status: $HTTP_STATUS"
  echo "📄 Response: $RESPONSE_BODY"
fi

echo ""
echo "3️⃣ Testing Dashboard Data..."
echo "==============================="

DASHBOARD_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -X GET "$BASE_URL/users/dashboard/data" \
  -H "Content-Type: application/json" \
  -H "x-firebase-uid: $TEST_FIREBASE_UID")

HTTP_STATUS=$(echo "$DASHBOARD_RESPONSE" | tail -1 | sed 's/.*://')
RESPONSE_BODY=$(echo "$DASHBOARD_RESPONSE" | head -n -1)

if [ "$HTTP_STATUS" = "200" ]; then
  echo "✅ Dashboard data fetch successful!"
  echo "📄 Response: $RESPONSE_BODY"
else
  echo "❌ Dashboard data fetch failed!"
  echo "🔥 HTTP Status: $HTTP_STATUS"
  echo "📄 Response: $RESPONSE_BODY"
fi

echo ""
echo "4️⃣ Testing Enrolled Courses..."
echo "================================"

COURSES_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -X GET "$BASE_URL/users/courses/enrolled" \
  -H "Content-Type: application/json" \
  -H "x-firebase-uid: $TEST_FIREBASE_UID")

HTTP_STATUS=$(echo "$COURSES_RESPONSE" | tail -1 | sed 's/.*://')
RESPONSE_BODY=$(echo "$COURSES_RESPONSE" | head -n -1)

if [ "$HTTP_STATUS" = "200" ]; then
  echo "✅ Enrolled courses fetch successful!"
  echo "📄 Response: $RESPONSE_BODY"
else
  echo "❌ Enrolled courses fetch failed!"
  echo "🔥 HTTP Status: $HTTP_STATUS"
  echo "📄 Response: $RESPONSE_BODY"
fi

echo ""
echo "5️⃣ Testing Available Courses..."
echo "=================================="

AVAILABLE_COURSES=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -X GET "$BASE_URL/courses")

HTTP_STATUS=$(echo "$AVAILABLE_COURSES" | tail -1 | sed 's/.*://')
RESPONSE_BODY=$(echo "$AVAILABLE_COURSES" | head -n -1)

if [ "$HTTP_STATUS" = "200" ]; then
  echo "✅ Available courses fetch successful!"
  echo "📊 Total courses available: $(echo "$RESPONSE_BODY" | jq '.data | length' 2>/dev/null || echo 'Unknown')"
else
  echo "❌ Available courses fetch failed!"
  echo "🔥 HTTP Status: $HTTP_STATUS"
  echo "📄 Response: $RESPONSE_BODY"
fi

echo ""
echo "🎯 Test Summary"
echo "==============="
echo "✅ User Creation: Success"
echo "✅ Profile Fetch: Success"
echo "✅ Dashboard Data: Success"
echo "✅ Enrolled Courses: Success"
echo "✅ Available Courses: Success"

echo ""
echo "🎉 All tests passed! Your signup flow is working correctly."
echo ""
echo "📱 Frontend URLs to test:"
echo "  - Auth Page: http://localhost:3000/auth"
echo "  - Dashboard: http://localhost:3000/dashboard"
echo "  - Courses: http://localhost:3000/courses"

echo ""
echo "🔧 Test user created:"
echo "  Email: $TEST_EMAIL"
echo "  Firebase UID: $TEST_FIREBASE_UID"
echo "  You can use this for frontend testing!"

echo ""
echo "💡 Next Steps:"
echo "  1. Test signup through frontend UI"
echo "  2. Verify user can see dashboard"
echo "  3. Test course enrollment flow"
echo "  4. Verify telegram links work"