#!/bin/bash

# HTML to PDF conversion script using wkhtmltopdf
# If wkhtmltopdf is not available, this will attempt other methods

echo "🔄 Converting pdf-guide.html to pdf-guide.pdf..."

# Try wkhtmltopdf first
if command -v wkhtmltopdf &> /dev/null; then
    echo "✓ Found wkhtmltopdf, using it..."
    wkhtmltopdf --encoding UTF-8 \
                --page-size Letter \
                --margin-top 40 \
                --margin-bottom 40 \
                --margin-left 40 \
                --margin-right 40 \
                --no-outline \
                pdf-guide.html pdf-guide.pdf
    RESULT=$?

    if [ $RESULT -eq 0 ]; then
        echo "✅ PDF created successfully!"
        ls -lh pdf-guide.pdf
        exit 0
    fi
fi

# Try Google Chrome/Chromium headless
if command -v google-chrome &> /dev/null; then
    echo "✓ Found Google Chrome, using it..."
    google-chrome --headless --disable-gpu --print-to-pdf pdf-guide.html --print-to-pdf-no-header pdf-guide.pdf
    RESULT=$?

    if [ $RESULT -eq 0 ]; then
        echo "✅ PDF created successfully!"
        ls -lh pdf-guide.pdf
        exit 0
    fi
fi

# Try Chromium
if command -v chromium &> /dev/null; then
    echo "✓ Found Chromium, using it..."
    chromium --headless --disable-gpu --print-to-pdf pdf-guide.html --print-to-pdf-no-header pdf-guide.pdf
    RESULT=$?

    if [ $RESULT -eq 0 ]; then
        echo "✅ PDF created successfully!"
        ls -lh pdf-guide.pdf
        exit 0
    fi
fi

# If we get here, no PDF tool found
echo "❌ No PDF conversion tool found."
echo ""
echo "📚 Manual options:"
echo "  1. Open pdf-guide.html in a browser"
echo "  2. Use Ctrl+P (Cmd+P on Mac) to save as PDF"
echo "  3. Save as: pdf-guide.pdf"
echo ""
echo "  2. Upload html file to online converter:"
echo "     https://cloudconvert.com/html-to-pdf"
echo ""
echo "  3. Use VS Code extension 'Markdown PDF'"
echo "     (if you have VS Code installed)"
echo ""
exit 1