/**
 * Deployment validation script
 * Run this before deployment to catch common issues
 */

import fs from "fs"
import path from "path"

// Validate package.json
function validatePackageJson() {
  try {
    const packageJsonPath = path.join(process.cwd(), "package.json")
    const packageJsonContent = fs.readFileSync(packageJsonPath, "utf8")

    // Check if it's valid JSON
    try {
      JSON.parse(packageJsonContent)
      console.log("✅ package.json is valid JSON")
    } catch (error) {
      // Add proper type guard for unknown error
      const errorMessage = error instanceof Error ? error.message : 'Unknown parsing error';
      console.error("❌ package.json is not valid JSON:", errorMessage)
      process.exit(1)
    }

    // Check for other potential issues
    const packageJson = JSON.parse(packageJsonContent)

    // Check for missing dependencies
    const requiredDeps = ["next", "react", "react-dom"]
    for (const dep of requiredDeps) {
      if (!packageJson.dependencies[dep]) {
        console.error(`❌ Missing required dependency: ${dep}`)
        process.exit(1)
      }
    }

    console.log("✅ All required dependencies are present")
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("❌ Error validating package.json:", errorMessage)
    process.exit(1)
  }
}

// Validate tsconfig.json
function validateTsConfig() {
  try {
    const tsConfigPath = path.join(process.cwd(), "tsconfig.json")
    const tsConfigContent = fs.readFileSync(tsConfigPath, "utf8")

    // Check if it's valid JSON
    try {
      JSON.parse(tsConfigContent)
      console.log("✅ tsconfig.json is valid JSON")
    } catch (error) {
      // Add proper type guard for unknown error
      const errorMessage = error instanceof Error ? error.message : 'Unknown parsing error';
      console.error("❌ tsconfig.json is not valid JSON:", errorMessage)
      process.exit(1)
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("❌ Error validating tsconfig.json:", errorMessage)
    process.exit(1)
  }
}

// Validate environment variables
function validateEnvVars() {
  const requiredEnvVars = [
    "NEXT_PUBLIC_NODE_ENV",
    "NEXT_PUBLIC_APP_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ]

  const missingVars = requiredEnvVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    console.warn("⚠️ Missing environment variables:", missingVars.join(", "))
    console.warn("These should be set in your Vercel project settings")
  } else {
    console.log("✅ All required environment variables are present")
  }
}

// Run all validations
function runValidations() {
  console.log("🔍 Running deployment validations...")
  validatePackageJson()
  validateTsConfig()
  validateEnvVars()
  console.log("✅ All validations passed!")
}

runValidations()
