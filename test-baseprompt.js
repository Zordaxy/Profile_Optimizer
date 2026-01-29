/**
 * Test script for basePrompt with OpenAI API
 *
 * Usage:
 * 1. Set your OpenAI API key as environment variable:
 *    export OPENAI_API_KEY="your-api-key-here"
 *
 * 2. Run the script:
 *    node test-baseprompt.js
 */

import { generateBasePrompt } from './src/prompts/basePrompt.js';

async function testBasePrompt() {
  console.log('🚀 Testing basePrompt with OpenAI API\n');

  // Get API key from environment variable
  const apiKey = '' // Add the public key here before testing

  if (!apiKey) {
    console.error('❌ Error: OPENAI_API_KEY environment variable not set');
    console.log('\nPlease set it using:');
    console.log('export OPENAI_API_KEY="your-api-key-here"\n');
    process.exit(1);
  }

  // Sample data
  const userProfile = `{\\n  \\"name\\": \\"Amrita Dasgupta\\",\\n  \\"headline\\": \\"Senior Software Engineer at LinkedIn\\",\\n  \\"location\\": \\"San Francisco Bay Area\\",\\n  \\"about\\": \\"Experienced Software Developer with a demonstrated history of quick learning. Strong engineering professional skilled in Java technologies, Databases, Hadoop and Hive. Currently working on creating virtual assistant at Bank of America.\\",\\n  \\"experience\\": [\\n    {\\n      \\"company\\": \\"LinkedIn\\",\\n      \\"title\\": \\"Senior Software Engineer\\",\\n      \\"duration\\": \\"Oct 2020 - Present · 5 yrs 4 mos\\",\\n      \\"description\\": \\"\\"\\n    },\\n    {\\n      \\"company\\": \\"LinkedIn\\",\\n      \\"title\\": \\"Software Engineer\\",\\n      \\"duration\\": \\"Apr 2019 - Oct 2020 · 1 yr 7 mos\\",\\n      \\"description\\": \\"Enterprise Platform\\"\\n    },\\n    {\\n      \\"company\\": \\"Bank of America\\",\\n      \\"title\\": \\"Vice President, Technology Application Engineer\\",\\n      \\"duration\\": \\"Sep 2016 - Apr 2019 · 2 yrs 8 mos\\",\\n      \\"description\\": \\"\\"\\n    },\\n    {\\n      \\"company\\": \\"Yahoo\\",\\n      \\"title\\": \\"Software Developer Intermediate\\",\\n      \\"duration\\": \\"Feb 2015 - Sep 2016 · 1 yr 8 mos\\",\\n      \\"description\\": \\"Work on batch data pipeline; use HDFS, Pig, Oozie, Hive, Hive ORC.\\"\\n    },\\n    {\\n      \\"company\\": \\"VCE, the Virtual Computing Environment Company\\",\\n      \\"title\\": \\"Intern\\",\\n      \\"duration\\": \\"Jun 2014 - Aug 2014 · 3 mos\\",\\n      \\"description\\": \\"Comparative analysis of security and compliance features of VBlock and its competitors.\\"\\n    },\\n    {\\n      \\"company\\": \\"Securonix\\",\\n      \\"title\\": \\"Developer Intern\\",\\n      \\"duration\\": \\"Jul 2013 - Nov 2013 · 5 mos\\",\\n      \\"description\\": \\"\\"\\n    }\\n  ],\\n  \\"education\\": [\\n    {\\n      \\"school\\": \\"The University of Texas at Dallas\\",\\n      \\"degree\\": \\"Master of Science (MS)\\",\\n      \\"field\\": \\"Computer Science\\",\\n      \\"dates\\": \\"2012 – 2014\\"\\n    },\\n    {\\n      \\"school\\": \\"Manipal Institute of Technology\\",\\n      \\"degree\\": \\"B Tech\\",\\n      \\"field\\": \\"Computer Science\\",\\n      \\"dates\\": \\"2006 – 2010\\"\\n    }\\n  ],\\n  \\"certifications\\": [\\n    {\\n      \\"name\\": \\"Software Design: Code and Design Smells\\",\\n      \\"issuer\\": \\"LinkedIn\\",\\n      \\"date\\": \\"Issued Apr 2020\\"\\n    }\\n  ],\\n  \\"languages\\": [\\n    {\\n      \\"language\\": \\"Bengali\\",\\n      \\"proficiency\\": \\"Native or bilingual proficiency\\"\\n    },\\n    {\\n      \\"language\\": \\"English\\",\\n      \\"proficiency\\": \\"Full professional proficiency\\"\\n    }\\n  ]\\n}`;

  const targetRole = "{  \"currentRole\": \"Senior Software Engineer, Core Experiences\",  \"company\": \"Speechify\",  \"industry\": \"Software Development\",  \"seniority\": \"senior\",  \"responsibilities\": [    \"Collaborate with Speechify's Product Teams to scope projects and deliver solutions via cross-platform SDK\",    \"Optimize existing functionality for faster loading and more intelligent parsing by improving abstractions and algorithms\",    \"Ship cloud functions, lightweight backend services, and jobs using Kotlin\",    \"Work at the intersection of product and infrastructure, designing clear, reliable APIs and simple systems\",    \"Engage in end-to-end system design with a focus on simplicity and speed\",    \"Inspire and collaborate with designers, marketers, and PMs\"  ],  \"achievements\": [    \"#1 in category with exponential growth\",    \"Google Chrome Extension of the Year\",    \"Apple App of the Day\",    \"Largest provider of Speech AI in the world\",    \"Product used by over 50 million people\"  ]}\n";

  const keySkills = "{\n" + "  \"topSkills\": [\n" + "    \"Eclipse\",\n" + "    \"Hibernate\",\n"
      + "    \"Amazon Web Services (AWS)\"\n" + "  ],\n" + "  \"allSkills\": [\n" + "    \"Eclipse\",\n"
      + "    \"Hibernate\",\n" + "    \"Amazon Web Services (AWS)\",\n" + "    \"C++\",\n" + "    \"MySQL\",\n"
      + "    \"NetBeans\",\n" + "    \"Java\",\n" + "    \"JavaScript\",\n" + "    \"Core Java\",\n" + "    \"REST\",\n"
      + "    \"Java Enterprise Edition\",\n" + "    \"Spring Framework\",\n" + "    \"JUnit\",\n"
      + "    \"Databases\",\n" + "    \"HTML\",\n" + "    \"Software Development\",\n" + "    \"SOA\",\n"
      + "    \"CSS\",\n" + "    \"Oracle\",\n" + "    \"Tortoise SVN\",\n" + "    \"ASP\",\n" + "    \"Spring\",\n"
      + "    \"JavaFX\",\n" + "    \"Jasper Reports\",\n" + "    \"TIBCO General Interface\",\n"
      + "    \"Amazon EC2\",\n" + "    \"Swing\",\n" + "    \"Apache Pig\",\n" + "    \"Hive\",\n" + "    \"Hadoop\",\n"
      + "    \"Oozie\",\n" + "    \"Software Design\"\n" + "  ],\n" + "  \"endorsements\": {\n"
      + "    \"Eclipse\": 26,\n" + "    \"Hibernate\": 17,\n" + "    \"Amazon Web Services (AWS)\": 16,\n"
      + "    \"C++\": 17,\n" + "    \"MySQL\": 13,\n" + "    \"NetBeans\": 11,\n" + "    \"Java\": 18,\n"
      + "    \"JavaScript\": 9,\n" + "    \"Core Java\": 7,\n" + "    \"REST\": 7,\n"
      + "    \"Java Enterprise Edition\": 5,\n" + "    \"Spring Framework\": 5,\n" + "    \"JUnit\": 4,\n"
      + "    \"Databases\": 5,\n" + "    \"HTML\": 3,\n" + "    \"Software Development\": 4,\n" + "    \"SOA\": 3,\n"
      + "    \"CSS\": 2,\n" + "    \"Oracle\": 2,\n" + "    \"Tortoise SVN\": 1,\n" + "    \"ASP\": 1,\n"
      + "    \"Spring\": 1\n" + "  },\n" + "  \"skillCategories\": {\n" + "    \"tools\": [\n" + "      \"Eclipse\",\n"
      + "      \"NetBeans\",\n" + "      \"Tortoise SVN\",\n" + "      \"Jasper Reports\",\n" + "      \"Amazon EC2\"\n"
      + "    ],\n" + "    \"programmingLanguages\": [\n" + "      \"Java\",\n" + "      \"C++\",\n"
      + "      \"JavaScript\",\n" + "      \"Core Java\",\n" + "      \"HTML\",\n" + "      \"CSS\"\n" + "    ],\n"
      + "    \"frameworksTechnologies\": [\n" + "      \"Hibernate\",\n" + "      \"Amazon Web Services (AWS)\",\n"
      + "      \"REST\",\n" + "      \"Java Enterprise Edition\",\n" + "      \"Spring Framework\",\n"
      + "      \"JUnit\",\n" + "      \"Spring\",\n" + "      \"JavaFX\",\n" + "      \"TIBCO General Interface\",\n"
      + "      \"Swing\",\n" + "      \"Apache Pig\",\n" + "      \"Hive\",\n" + "      \"Hadoop\",\n"
      + "      \"Oozie\"\n" + "    ],\n" + "    \"databases\": [\n" + "      \"MySQL\",\n" + "      \"Databases\",\n"
      + "      \"Oracle\"\n" + "    ],\n" + "    \"softwareDevelopment\": [\n" + "      \"Software Development\",\n"
      + "      \"Software Design\",\n" + "      \"SOA\"\n" + "    ],\n" + "    \"other\": [\n" + "      \"ASP\"\n"
      + "    ]\n" + "  }\n" + "}";

  // Generate the prompt
  console.log('📝 Generating base prompt...\n');
  const prompt = generateBasePrompt(userProfile, targetRole, keySkills);

  console.log('Generated Prompt:');
  console.log('─'.repeat(80));
  console.log(prompt);
  console.log('─'.repeat(80));
  console.log();

  // Call OpenAI API
  console.log('🤖 Calling OpenAI API...\n');

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        temperature: 0.7,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('❌ OpenAI API Error:', data.error.message);
      process.exit(1);
    }

    const result = data.choices?.[0]?.message?.content?.trim();

    console.log('********************************* ✅ Response received!\n');
    console.log('********************************  Optimized Profile:');
    console.log('═'.repeat(80));
    console.log(result);
    console.log('═'.repeat(80));
    console.log();

    // Display token usage
    if (data.usage) {
      console.log('📊 Token Usage:');
      console.log(`   Prompt tokens: ${data.usage.prompt_tokens}`);
      console.log(`   Completion tokens: ${data.usage.completion_tokens}`);
      console.log(`   Total tokens: ${data.usage.total_tokens}`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the test
testBasePrompt();
