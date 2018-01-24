rsync -r src/ docs/
rsync build/contracts/CryptoRose.json docs/
git add .
git commit -m "Adding frontend files to Github Pages"
git push
