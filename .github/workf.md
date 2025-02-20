---
title: "❌ Workflow Failure - ${{ github.event.workflow_run.name }}"
labels: bug, automated
---

## 🚨 Workflow Failed
- **Repository**: ${{ github.repository }}
- **Workflow**: ${{ github.event.workflow_run.name }}
- **Run ID**: ${{ github.event.workflow_run.id }}
- **Commit SHA**: ${{ github.event.workflow_run.head_sha }}
- **Triggered By**: ${{ github.actor }}

🔍 **Error Details**:  
Buka [Logs](https://github.com/${{ github.repository }}/actions/runs/${{ github.event.workflow_run.id }}) untuk melihat detail error.

---
📌 *Issue ini dibuat secara otomatis oleh GitHub Actions dan akan ditutup setelah beberapa jam jika tidak ada intervensi manual.*