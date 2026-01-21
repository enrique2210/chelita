import io
import base64

from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch

from app.schemas.item import Item


def buffer_to_base64(buffer: io.BytesIO) -> str:
    buffer.seek(0)  # make sure we're at the start
    return base64.b64encode(buffer.read()).decode("utf-8")


def generate_pdf(item: Item) -> str:
    buffer = io.BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40,
    )


    styles = getSampleStyleSheet()
    elements = []

    # --- Header ---
    elements.append(Paragraph("<b>Chelita Software</b>", styles["Title"]))
    elements.append(Spacer(1, 35))

    # --- Item details ---
    data = [
        [Paragraph("<b>Nombre:</b>", styles["Normal"]), f"{item.name}"],
        [Paragraph("<b>Apellido:</b>", styles["Normal"]), f"{item.last_name}"],
        [Paragraph("<b>Edad:</b>", styles["Normal"]), f"{item.age}"],
        [Paragraph("<b>Telefono:</b>", styles["Normal"]), f"{item.phone}"],
        [Paragraph("<b>Correo:</b>", styles["Normal"]), f"{item.email}"],
    ]

    table = Table(
        data,
        colWidths=[100, 300],  # label | value
    )

    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )

    elements.append(table)

    # Build PDF
    doc.build(elements)
    base64_pdf = buffer_to_base64(buffer)

    return base64_pdf
